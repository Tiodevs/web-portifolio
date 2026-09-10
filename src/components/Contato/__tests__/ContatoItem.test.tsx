import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contato } from '../Contato';
import { EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_PROFILE_URL } from '../../../lib/social';

describe('Componente Contato', () => {
  beforeEach(() => {
    render(<Contato />);
  });

  it('Deve renderizar a imagem principal com o alt text correto', () => {
    const imagemPrincipal = screen.getByAltText('Foto de Felipe P. dos Santos');
    expect(imagemPrincipal).toBeInTheDocument();
  });

  it('Deve renderizar o título principal', () => {
    const titulo = screen.getByRole('heading', { name: /vamos conversar/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  it('Deve renderizar o link de email com o texto e href corretos', () => {
    const linkEmail = screen.getByRole('link', { name: EMAIL });

    expect(linkEmail).toBeInTheDocument();
    expect(linkEmail).toHaveAttribute('href', `mailto:${EMAIL}`);
  });

  it('Deve renderizar o link para o LinkedIn com o href correto', () => {
    const linkLinkedin = screen.getByRole('link', { name: /meu linkedin/i });

    expect(linkLinkedin).toBeInTheDocument();
    expect(linkLinkedin).toHaveAttribute('href', LINKEDIN_PROFILE_URL);
  });

  it('Deve renderizar o link para o GitHub', () => {
    const linkGithub = screen.getByRole('link', { name: /meu github/i });

    expect(linkGithub).toBeInTheDocument();
    expect(linkGithub).toHaveAttribute('href', GITHUB_URL);
  });

  it('Deve renderizar o link para o Instagram com o href correto', () => {
    const linkInstagram = screen.getByRole('link', { name: /meu instagram/i });

    expect(linkInstagram).toBeInTheDocument();
    expect(linkInstagram).toHaveAttribute('href', INSTAGRAM_URL);
  });

  it('Deve renderizar a mensagem de copyright', () => {
    const copyright = screen.getByText(/© 2026 Felipe Santos/i);
    expect(copyright).toBeInTheDocument();
  });
});
