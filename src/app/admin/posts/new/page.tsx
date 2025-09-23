'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import gsap from 'gsap';

export default function NewPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
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
  }, []);

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

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Post criado com sucesso!');
        router.push('/admin/posts');
      } else {
        setError(data.error || 'Erro ao criar post');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndContinue = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, published: false })
      });

      const data = await response.json();

      if (data.success) {
        alert('Rascunho salvo com sucesso!');
        router.push(`/admin/posts/${data.data.id}`);
      } else {
        setError(data.error || 'Erro ao salvar rascunho');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.admin}>
        <header className={styles.header} ref={headerRef}>
          <div className={styles.headerTop}>
            <Link href="/admin/posts" className={styles.backLink}>
              ← Voltar aos posts
            </Link>
          </div>
          
          <h1 className={styles.title}>Criar Novo Post</h1>
          <p className={styles.subtitle}>Preencha as informações abaixo para criar um novo post</p>
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
                Publicar imediatamente
              </span>
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleSaveAndContinue}
              disabled={loading}
              className={styles.draftButton}
            >
              {loading ? 'Salvando...' : 'Salvar Rascunho'}
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={styles.publishButton}
            >
              {loading ? 'Criando...' : formData.published ? 'Criar e Publicar' : 'Criar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
