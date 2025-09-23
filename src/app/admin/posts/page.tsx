'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { BlogPost } from '@/lib/blog';
import gsap from 'gsap';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Buscar todos os posts
  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts?page=1&limit=100');
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
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
      } else {
        alert('Erro ao alterar status: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão ao alterar status');
    }
  };

  // Filtrar posts
  const filteredPosts = posts.filter(post => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'published' && post.published) ||
      (filter === 'draft' && !post.published);
    
    const matchesSearch = 
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

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
      .from(filtersRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from(tableRef.current, {
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
          <h2>Carregando posts...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2>Erro ao carregar posts</h2>
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
          <div className={styles.headerTop}>
            <Link href="/admin" className={styles.backLink}>
              ← Voltar ao painel
            </Link>
          </div>
          
          <h1 className={styles.title}>Gerenciar Posts</h1>
          <p className={styles.subtitle}>
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
          </p>
          
          <Link href="/admin/posts/new" className={styles.createButton}>
            + Novo Post
          </Link>
        </header>

        <div className={styles.filters} ref={filtersRef}>
          <div className={styles.filterButtons}>
            <button 
              onClick={() => setFilter('all')}
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            >
              Todos ({posts.length})
            </button>
            <button 
              onClick={() => setFilter('published')}
              className={`${styles.filterButton} ${filter === 'published' ? styles.active : ''}`}
            >
              Publicados ({posts.filter(p => p.published).length})
            </button>
            <button 
              onClick={() => setFilter('draft')}
              className={`${styles.filterButton} ${filter === 'draft' ? styles.active : ''}`}
            >
              Rascunhos ({posts.filter(p => !p.published).length})
            </button>
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.tableContainer} ref={tableRef}>
          {filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>
              <h3>Nenhum post encontrado</h3>
              <p>
                {searchTerm ? 
                  'Tente ajustar os filtros ou termo de busca.' :
                  'Comece criando seu primeiro post!'
                }
              </p>
              {!searchTerm && (
                <Link href="/admin/posts/new" className={styles.createFirstButton}>
                  Criar primeiro post
                </Link>
              )}
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map(post => (
                  <tr key={post.id}>
                    <td className={styles.titleCell}>
                      <div className={styles.postInfo}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        <p className={styles.postExcerpt}>
                          {post.excerpt || post.content.substring(0, 80) + '...'}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${post.published ? styles.published : styles.draft}`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actions}>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
