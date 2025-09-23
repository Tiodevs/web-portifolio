import { BlogPost } from '@/lib/blog'

// Tipos para respostas da API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Tipos específicos para posts
export interface PostsResponse {
  posts: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
}

export interface UpdatePostData {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  published?: boolean
}
