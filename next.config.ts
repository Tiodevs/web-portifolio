import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração para Docker - gera um build standalone
  // Isso cria um servidor independente que não precisa de node_modules
  output: 'standalone',

};

export default nextConfig;
