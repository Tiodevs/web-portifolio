# 🧪 Como Usar os Testes

## ✅ Teste Funcionando!

Você já tem um teste simples funcionando! Execute:

```bash
npm test
```

## 📋 O que o teste faz?

O teste verifica se o componente `CertificadoItem` mostra o título corretamente:

```tsx
it('deve mostrar o título do certificado', () => {
  // Renderiza o componente com um título
  render(
    <CertificadoItem 
      titulo="JavaScript Básico"
      descricao="Curso de JavaScript"
    />
  )

  // Verifica se o título aparece na tela
  expect(screen.getByText('JavaScript Básico')).toBeInTheDocument()
})
```

## 🎯 3 Passos de Todo Teste:

1. **Renderiza** o componente
2. **Busca** um elemento na tela
3. **Verifica** se está correto

## 🚀 Próximo teste que você pode fazer:

Adicione este teste no mesmo arquivo:

```tsx
it('deve mostrar a descrição do certificado', () => {
  render(
    <CertificadoItem 
      titulo="React Avançado"
      descricao="Aprenda React hooks"
    />
  )

  expect(screen.getByText('Aprenda React hooks')).toBeInTheDocument()
})
```

## 📁 Onde estão os arquivos:

- **Teste:** `src/components/Certificados/__tests__/CertificadoItem.test.tsx`
- **Componente:** `src/components/Certificados/CertificadoItem.tsx`

Pronto! Agora você já sabe o básico! 🎉 