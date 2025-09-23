'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { BlogPost } from '@/lib/blog';
import gsap from 'gsap';

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0
  });

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  // Buscar todos os posts (incluindo rascunhos)
  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts?page=1&limit=50'); // Buscar mais posts para admin
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        
        // Calcular estatísticas
        const published = data.data.posts.filter((post: BlogPost) => post.published).length;
        const drafts = data.data.posts.filter((post: BlogPost) => !post.published).length;
        
        setStats({
          total: data.data.posts.length,
          published,
          drafts
        });
      } else {
        setError(data.error || 'Erro ao carregar posts');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // Deletar post
  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar o post "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setPosts(prev => prev.filter(post => post.id !== id));
        alert('Post deletado com sucesso!');
        
        // Recalcular stats
        const updatedPosts = posts.filter(post => post.id !== id);
        const published = updatedPosts.filter(post => post.published).length;
        const drafts = updatedPosts.filter(post => !post.published).length;
        
        setStats({
          total: updatedPosts.length,
          published,
          drafts
        });
      } else {
        alert('Erro ao deletar post: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão ao deletar post');
    }
  };

  // Alternar status de publicação
  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          published: !currentStatus
        })
      });

      const data = await response.json();

      if (data.success) {
        setPosts(prev => prev.map(post => 
          post.id === id 
            ? { ...post, published: !currentStatus, publishedAt: !currentStatus ? new Date() : null }
            : post
        ));
        
        // Recalcular stats
        const updatedPosts = posts.map(post => 
          post.id === id 
            ? { ...post, published: !currentStatus }
            : post
        );
        const published = updatedPosts.filter(post => post.published).length;
        const drafts = updatedPosts.filter(post => !post.published).length;
        
        setStats({
          total: updatedPosts.length,
          published,
          drafts
        });
      } else {
        alert('Erro ao alterar status: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão ao alterar status');
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      tl.from(pageRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .from(headerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")
      .from(statsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from(postsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }
  }, [loading]);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Não publicado';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <h2>Carregando painel...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2>Erro ao carregar painel</h2>
          <p>{error}</p>
          <button onClick={fetchAllPosts} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.admin}>
        <header className={styles.header} ref={headerRef}>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>Gerencie todos os posts do seu blog</p>
          
          <div className={styles.actions}>
            <Link href="/admin/posts/new" className={styles.createButton}>
              + Novo Post
            </Link>
            <Link href="/blog" className={styles.viewBlogButton}>
              Ver Blog
            </Link>
          </div>
        </header>

        <div className={styles.stats} ref={statsRef}>
          <div className={styles.statCard}>
            <h3>Total de Posts</h3>
            <span className={styles.statNumber}>{stats.total}</span>
          </div>
          <div className={styles.statCard}>
            <h3>Publicados</h3>
            <span className={`${styles.statNumber} ${styles.published}`}>{stats.published}</span>
          </div>
          <div className={styles.statCard}>
            <h3>Rascunhos</h3>
            <span className={`${styles.statNumber} ${styles.drafts}`}>{stats.drafts}</span>
          </div>
        </div>

        <div className={styles.postsSection} ref={postsRef}>
          <div className={styles.sectionHeader}>
            <h2>Todos os Posts</h2>
            <Link href="/admin/posts" className={styles.viewAllButton}>
              Ver lista completa
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className={styles.noPosts}>
              <h3>Nenhum post encontrado</h3>
              <p>Comece criando seu primeiro post!</p>
              <Link href="/admin/posts/new" className={styles.createFirstButton}>
                Criar primeiro post
              </Link>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.slice(0, 6).map(post => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <div className={styles.postStatus}>
                      <span className={`${styles.badge} ${post.published ? styles.published : styles.draft}`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                  
                  <p className={styles.postExcerpt}>
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                  
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  <div className={styles.postActions}>
                    <Link href={`/admin/posts/${post.id}`} className={styles.editButton}>
                      Editar
                    </Link>
                    <Link href={`/blog/${post.id}`} className={styles.viewButton}>
                      Ver
                    </Link>
                    <button 
                      onClick={() => togglePublished(post.id, post.published)}
                      className={`${styles.toggleButton} ${post.published ? styles.unpublish : styles.publish}`}
                    >
                      {post.published ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button 
                      onClick={() => deletePost(post.id, post.title)}
                      className={styles.deleteButton}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
