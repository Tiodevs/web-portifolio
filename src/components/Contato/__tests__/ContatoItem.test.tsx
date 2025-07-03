import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contato } from '../Contato';

describe('Componente Contato', () => {
  // 1. Renderiza o componente uma vez antes de cada teste
  beforeEach(() => {
    render(<Contato />);
  });

  it('Deve renderizar a imagem principal com o alt text correto', () => {
    const imagemPrincipal = screen.getByAltText('Foto do felipe o dono do portifolio');
    expect(imagemPrincipal).toBeInTheDocument();
  });

  it('Deve renderizar o título principal', () => {
    const titulo = screen.getByRole('heading', { name: /contate-me/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  it('Deve renderizar o link de email com o texto e href corretos', () => {
    // Testando por Role, que é mais semântico
    const linkEmail = screen.getByRole('link', { name: /santospefelipe@gmail.com/i });
    
    expect(linkEmail).toBeInTheDocument();
    expect(linkEmail).toHaveAttribute('href', 'mailto:santospefelipe@gmail.com');
  });

  it('Deve renderizar o link para o LinkedIn com o href correto', () => {
    // Usando Role e o alt text da imagem para encontrar o link
    const linkLinkedin = screen.getByRole('link', { name: /meu linkedin/i });
    
    expect(linkLinkedin).toBeInTheDocument();
    expect(linkLinkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/felipe-p-santos-a1a3b9207/');
  });
  
  it('Deve renderizar o link para o Instagram com o href correto', () => {
    const linkInstagram = screen.getByRole('link', { name: /meu intagram/i }); // Corrigido para 'Intagram' como no seu 'alt'
    
    expect(linkInstagram).toBeInTheDocument();
    expect(linkInstagram).toHaveAttribute('href', 'https://www.instagram.com/somente_ofelipe/');
  });

  it('Deve renderizar a mensagem de copyright', () => {
    const copyright = screen.getByText(/© 2025 Felipe Santos/i);
    expect(copyright).toBeInTheDocument();
  });
});