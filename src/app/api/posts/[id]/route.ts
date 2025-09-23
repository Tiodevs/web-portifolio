import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/blog'

// GET /api/posts/[id] - Buscar post específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await BlogService.getPostById(params.id)

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - Atualizar post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const post = await BlogService.updatePost(params.id, {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      published: body.published
    })

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Erro ao atualizar post:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Deletar post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await BlogService.deletePost(params.id)

    return NextResponse.json({
      success: true,
      message: 'Post deletado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar post:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
