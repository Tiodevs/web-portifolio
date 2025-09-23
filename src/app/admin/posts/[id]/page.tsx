'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { BlogPost } from '@/lib/blog';
import gsap from 'gsap';

export default function EditPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Buscar post existente
  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();

      if (data.success) {
        const postData = data.data;
        setPost(postData);
        setFormData({
          title: postData.title,
          excerpt: postData.excerpt || '',
          content: postData.content,
          coverImage: postData.coverImage || '',
          published: postData.published
        });
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
      .from(headerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")
      .from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, [loading, post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Post atualizado com sucesso!');
        setPost(data.data);
      } else {
        setError(data.error || 'Erro ao atualizar post');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar o post "${post?.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        alert('Post deletado com sucesso!');
        router.push('/admin/posts');
      } else {
        alert('Erro ao deletar post: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão ao deletar post');
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Nunca publicado';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <h2>Erro ao carregar post</h2>
          <p>{error || 'Post não encontrado'}</p>
          <div className={styles.errorActions}>
            <Link href="/admin/posts" className={styles.backButton}>
              ← Voltar aos posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.admin}>
        <header className={styles.header} ref={headerRef}>
          <div className={styles.headerTop}>
            <Link href="/admin/posts" className={styles.backLink}>
              ← Voltar aos posts
            </Link>
            <Link href={`/blog/${postId}`} className={styles.viewLink}>
              Ver post →
            </Link>
          </div>
          
          <h1 className={styles.title}>Editar Post</h1>
          <div className={styles.postInfo}>
            <span className={`${styles.badge} ${post.published ? styles.published : styles.draft}`}>
              {post.published ? 'Publicado' : 'Rascunho'}
            </span>
            <span className={styles.date}>
              {post.published ? `Publicado em ${formatDate(post.publishedAt)}` : 'Não publicado'}
            </span>
          </div>
        </header>

        <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="Digite o título do post..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>
              Resumo
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className={`${styles.textarea} ${styles.small}`}
              placeholder="Breve descrição do post (opcional)..."
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverImage" className={styles.label}>
              URL da Imagem de Capa
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className={styles.input}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              Conteúdo *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Escreva o conteúdo do post usando Markdown..."
              rows={20}
              required
            />
            <div className={styles.markdownHelp}>
              <strong>Dica:</strong> Você pode usar Markdown para formatar o texto:
              <br />
              <code># Título</code>, <code>## Subtítulo</code>, <code>**negrito**</code>, <code>*itálico*</code>, <code>`código`</code>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                Post publicado
              </span>
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={saving}
            >
              Deletar Post
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className={styles.saveButton}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
