# Como Atualizar a Foto da Profissional

## 📸 Passos para adicionar a foto real da Veralucia:

### 1. **Preparar a imagem:**
   - Renomeie a foto para: `veralucia-profissional.jpg`
   - Tamanho recomendado: 600x600 pixels (quadrada)
   - Formato: JPG ou PNG
   - Qualidade: Alta resolução

### 2. **Salvar no local correto:**
   ```
   C:\Users\renov\xxxvera\public\images\veralucia-profissional.jpg
   ```

### 3. **A imagem será usada em:**
   - ✅ Página inicial (seção principal)
   - ✅ Página inicial (card da profissional)
   - ✅ Página "Quem Somos"
   - ✅ Fallback automático para Unsplash se não encontrar

### 4. **Sistema de Fallback:**
   - Se a imagem local não carregar, usa automaticamente uma do Unsplash
   - Não quebra o site se a imagem estiver faltando
   - Transição suave entre imagens

## 🎨 **Dicas para a foto ideal:**
- **Fundo**: Preferencialmente branco ou neutro
- **Pose**: Profissional, sorrindo
- **Iluminação**: Clara e uniforme
- **Resolução**: Mínimo 600x600px
- **Formato**: JPG preferível (menor tamanho)

## ⚙️ **Componente Usado:**
O sistema usa o componente `ProfessionalImage.tsx` que gerencia:
- Carregamento da imagem local
- Fallback automático
- Diferentes tamanhos (small, medium, large)
- Error handling

## 🔄 **Para testar:**
1. Salve a imagem no local indicado
2. Recarregue a página
3. A nova foto aparecerá automaticamente