'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { Contato } from '@/components/Contato/Contato';
import { BlogPost } from '@/lib/blog';
import gsap from 'gsap';

export default function PostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const pageRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Buscar post específico
  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.data);
      } else {
        setError(data.error || 'Post não encontrado');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  useEffect(() => {
    if (!loading && post) {
      const tl = gsap.timeline();

      tl.from(pageRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .from(backButtonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")
      .from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }
  }, [loading, post]);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Data não informada';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Converte markdown básico para HTML
    return content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n/gim, '<br>');
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <h2>Carregando post...</h2>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2>Post não encontrado</h2>
          <p>{error || 'O post que você está procurando não existe ou foi removido.'}</p>
          <div className={styles.errorButtons}>
            <button onClick={() => router.back()} className={styles.backButton}>
              ← Voltar
            </button>
            <Link href="/blog" className={styles.blogButton}>
              Ver todos os posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.post}>
        <div className={styles.backButtonContainer} ref={backButtonRef}>
          <Link href="/blog" className={styles.backLink}>
            ← Voltar para o blog
          </Link>
        </div>

        <article className={styles.article}>
          <header className={styles.postHeader} ref={headerRef}>
            
            <div className={styles.postMeta}>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <div className={styles.postInfo}>
                <time className={styles.postDate}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.published && (
                  <span className={styles.publishedBadge}>Publicado</span>
                )}
              </div>
              {post.excerpt && (
                <p className={styles.postExcerpt}>{post.excerpt}</p>
              )}
            </div>
          </header>

          <div className={styles.postContent} ref={contentRef}>
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ 
                __html: formatContent(post.content) 
              }}
            />
          </div>
        </article>

        <div className={styles.postFooter}>
          <div className={styles.navigation}>
            <Link href="/blog" className={styles.backToListButton}>
              ← Ver todos os posts
            </Link>
          </div>
        </div>
      </div>

      <Contato />
    </div>
  );
}
