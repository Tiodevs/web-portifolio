import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para Docker - gera um build standalone
  // Isso cria um servidor independente que não precisa de node_modules
  output: 'standalone',

  // Configuração de imagens para permitir domínios externos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.example.com',
        port: '',
        pathname: '/**',
      },
      // Adicione outros domínios conforme necessário
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
