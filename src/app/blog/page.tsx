'use client';

import styles from "./page.module.css";
import BlogCard from "@/components/Blog/BlogCard";
import { Contato } from "../../components/Contato/Contato";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLoadingState } from "../../hooks/useLoadingState";
import { BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const blogsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading: appLoading } = useLoadingState();

  // Buscar posts da API
  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${pageNum}&limit=3`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        setError(data.error || 'Erro ao carregar posts');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    if (!appLoading && !loading) {
      const tl = gsap.timeline();

      tl.from(blogsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
        .from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.2")
        .from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5")
        .from(containerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5");
    }
  }, [appLoading, loading]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // Scroll para o topo suavemente
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <h2>Carregando posts...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2>Ops! Algo deu errado</h2>
          <p>{error}</p>
          <button onClick={() => fetchPosts(page)} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${appLoading ? styles.hidden : styles.visible}`}>
      <div className={styles.blogs} ref={blogsRef}>
        <div className={styles.blog}>
          <h2 className={styles.blogsTitle} ref={titleRef}>Blog</h2>
          <p className={styles.blogsDescription} ref={descriptionRef}>
            Aqui compartilho conhecimentos sobre desenvolvimento, tecnologia e experiências da área. 
            Artigos práticos, tutoriais e insights para desenvolvedores de todos os níveis.
          </p>
          
          {posts.length === 0 ? (
            <div className={styles.noPosts}>
              <h3>Nenhum post encontrado</h3>
              <p>Ainda não há posts publicados no blog.</p>
            </div>
          ) : (
            <div className={styles.blogsContainer} ref={containerRef}>
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={styles.paginationButton}
              >
                ← Anterior
              </button>
              
              <div className={styles.paginationInfo}>
                <span>Página {page} de {totalPages}</span>
              </div>
              
              <button 
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={styles.paginationButton}
              >
                Próxima →
              </button>
            </div>
          )}
        </div>
      </div>

      <Contato />
    </div>
  );
}
