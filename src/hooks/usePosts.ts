'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/blog'
import { ApiResponse, PostsResponse, CreatePostData, UpdatePostData } from '@/types/api'

// Hook para gerenciar posts via API
export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Buscar posts publicados
  const fetchPosts = async (page = 1, limit = 10) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
      const data: ApiResponse<PostsResponse> = await response.json()
      
      if (data.success && data.data) {
        setPosts(data.data.posts)
        return data.data
      } else {
        setError(data.error || 'Erro ao carregar posts')
        return null
      }
    } catch (err) {
      setError('Erro de conexão')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Buscar post específico
  const fetchPost = async (id: string): Promise<BlogPost | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts/${id}`)
      const data: ApiResponse<BlogPost> = await response.json()
      
      if (data.success && data.data) {
        return data.data
      } else {
        setError(data.error || 'Post não encontrado')
        return null
      }
    } catch (err) {
      setError('Erro de conexão')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Criar novo post
  const createPost = async (postData: CreatePostData): Promise<BlogPost | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      
      const data: ApiResponse<BlogPost> = await response.json()
      
      if (data.success && data.data) {
        // Atualizar lista local
        setPosts(prev => [data.data!, ...prev])
        return data.data
      } else {
        setError(data.error || 'Erro ao criar post')
        return null
      }
    } catch (err) {
      setError('Erro de conexão')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Atualizar post
  const updatePost = async (id: string, postData: UpdatePostData): Promise<BlogPost | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      
      const data: ApiResponse<BlogPost> = await response.json()
      
      if (data.success && data.data) {
        // Atualizar lista local
        setPosts(prev => prev.map(post => 
          post.id === id ? data.data! : post
        ))
        return data.data
      } else {
        setError(data.error || 'Erro ao atualizar post')
        return null
      }
    } catch (err) {
      setError('Erro de conexão')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Deletar post
  const deletePost = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      })
      
      const data: ApiResponse<void> = await response.json()
      
      if (data.success) {
        // Remover da lista local
        setPosts(prev => prev.filter(post => post.id !== id))
        return true
      } else {
        setError(data.error || 'Erro ao deletar post')
        return false
      }
    } catch (err) {
      setError('Erro de conexão')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
  }
}

// Hook para um post específico
export function usePost(id: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/posts/${id}`)
        const data: ApiResponse<BlogPost> = await response.json()
        
        if (data.success && data.data) {
          setPost(data.data)
        } else {
          setError(data.error || 'Post não encontrado')
        }
      } catch (err) {
        setError('Erro de conexão')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  return { post, loading, error }
}
