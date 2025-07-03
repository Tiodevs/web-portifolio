import React from 'react'
import { render, screen } from '@testing-library/react'
import { CertificadoItem } from '../CertificadoItem'

// Um teste bem simples!
describe('CertificadoItem', () => {
  it('deve mostrar o título do certificado no lugar correto', () => {
    // Renderiza o componente
    render(
      <CertificadoItem 
        titulo="JavaScript Básico"
        descricao="Curso de JavaScript"
      />
    )

    // Verifica se o título aparece ESPECIFICAMENTE no elemento de título
    expect(screen.getByTestId('certificado-titulo')).toHaveTextContent('JavaScript Básico')
  })
  it('deve mostrar a descrição do certificado no lugar correto', () => {
    // Renderiza o componente
    render(
      <CertificadoItem 
        titulo="JavaScript Básico"
        descricao="Curso de JavaScript"
      />
    )

    // Verifica se a descrição aparece ESPECIFICAMENTE no elemento de descrição
    expect(screen.getByTestId('certificado-descricao')).toHaveTextContent('Curso de JavaScript')
  })

  // ✨ NÍVEL 1: Testando props opcionais
  it('deve mostrar a imagem quando fornecida', () => {
    render(
      <CertificadoItem 
        titulo="React Hooks"
        descricao="Aprenda useState e useEffect"
        imagem="/certificados/react.png"
      />
    )

    // Busca a imagem pelo alt text (que é gerado automaticamente)
    const imagem = screen.getByAltText('Certificado de React Hooks')
    expect(imagem).toBeInTheDocument()
    expect(imagem).toHaveAttribute('src', '/certificados/react.png')
  })

  // ✨ NÍVEL 2: Testando valores padrão
  it('deve mostrar "Certificado" e "Concluído" por padrão', () => {
    render(
      <CertificadoItem 
        titulo="Node.js"
        descricao="Backend com JavaScript"
        // NÃO passamos progresso nem status, então usa os padrões
      />
    )

    // Verifica os valores padrão do componente
    expect(screen.getByText('Certificado')).toBeInTheDocument()
    expect(screen.getByText('Concluído')).toBeInTheDocument()
  })

  it('deve mostrar "Em Andamento" quando progresso for menor que 100%', () => {
    render(
      <CertificadoItem 
        titulo="Python"
        descricao="Linguagem de programação"
        progresso={65}
        status="65% completo"
      />
    )

    expect(screen.getByText('Em Andamento')).toBeInTheDocument()
    expect(screen.getByText('65% completo')).toBeInTheDocument()
    
    // E NÃO deve mostrar "Certificado"
    expect(screen.queryByText('Certificado')).not.toBeInTheDocument()
  })

  it('deve ter os atributos data corretos', () => {
    render(
      <CertificadoItem 
        titulo="TypeScript"
        descricao="JavaScript com tipos"
        index={3}
        progresso={25}
      />
    )

    // Busca o elemento principal pela classe
    const elemento = document.querySelector('.curso-item')
    
    // Verifica se tem os atributos corretos
    expect(elemento).toHaveAttribute('data-index', '3')
    expect(elemento).toHaveAttribute('data-progress', 'incomplete')
  })

  it('deve mostrar a barra de progresso com largura correta', () => {
    render(
      <CertificadoItem 
        titulo="Vue.js"
        descricao="Framework progressivo"
        progresso={80}
      />
    )

    // Busca o elemento da barra de progresso pelo estilo
    const barraProgresso = document.querySelector('[style*="width: 80%"]')
    
    expect(barraProgresso).toBeInTheDocument()
    expect(barraProgresso).toHaveStyle('width: 80%')
  })

  it('NÃO deve mostrar imagem quando não fornecida', () => {
    render(
      <CertificadoItem 
        titulo="Docker"
        descricao="Containerização"
        // Não passamos a prop imagem
      />
    )

    // Verifica que NÃO existe nenhuma imagem
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    
    // Ou verifica que não existe o alt text específico
    expect(screen.queryByAltText('Certificado de Docker')).not.toBeInTheDocument()
  })
}) 