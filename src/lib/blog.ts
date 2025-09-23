import prisma from './prisma'
import { Post } from '@/generated/prisma'

// Tipo simples para posts
export type BlogPost = Post

// Funções simples para o blog
export class BlogService {
  // Buscar todos os posts publicados
  static async getPublishedPosts(page = 1, limit = 10): Promise<{ posts: BlogPost[]; total: number }> {
    const skip = (page - 1) * limit

    const where = { published: true }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.post.count({ where })
    ])

    return { posts, total }
  }

  // Buscar post por ID
  static async getPostById(id: string): Promise<BlogPost | null> {
    return prisma.post.findUnique({
      where: { id, published: true }
    })
  }

  // Criar novo post
  static async createPost(data: {
    title: string
    content: string
    excerpt?: string
    coverImage?: string
    published?: boolean
  }): Promise<BlogPost> {

    return prisma.post.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null
      }
    })

  }

  // Atualizar post
  static async updatePost(id: string, data: {
    title?: string
    content?: string
    excerpt?: string
    coverImage?: string
    published?: boolean
  }): Promise<BlogPost> {

    return prisma.post.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null
      }
    })

  }

  // Deletar post
  static async deletePost(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id }
    })
  }

}
