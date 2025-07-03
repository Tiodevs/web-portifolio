const nextJest = require('next/jest')       

const createJestConfig = nextJest({
  // Caminho para sua aplicação Next.js
  dir: './',
})

// Configurações customizadas do Jest
const customJestConfig = {
  // Configuração do ambiente de teste
  testEnvironment: 'jsdom',
  
  // Arquivos de setup que serão executados antes dos testes
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Padrões de arquivos de teste
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/*.(test|spec).{js,jsx,ts,tsx}'
  ],
  
  // Diretórios que devem ser ignorados
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  
  // Configuração de módulos
  moduleNameMapping: {
    // Mapeamento para arquivos CSS e outros assets
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
}

// Exporta a configuração usando o createJestConfig do Next.js
module.exports = createJestConfig(customJestConfig) 