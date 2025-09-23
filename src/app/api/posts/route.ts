import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog'

// GET /api/posts - Listar posts publicados
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const { posts, total } = await BlogService.getPublishedPosts(page, limit)

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Criar novo post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validação básica
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    const post = await BlogService.createPost({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      published: body.published || false
    })

    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 })
    
  } catch (error) {
    console.error('Erro ao criar post:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
