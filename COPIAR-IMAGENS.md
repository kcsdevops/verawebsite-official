# Script para Copiar Imagens dos Cases de Sucesso

## 📁 Localização das Imagens
Origem: `C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso`
Destino: `C:\Users\renov\xxxvera\public\images\cases\`

## 🔧 Como Copiar as Imagens

### Opção 1: Via PowerShell (Recomendado)
Abra o PowerShell e execute:

```powershell
# Criar pasta de destino se não existir
New-Item -ItemType Directory -Force -Path "C:\Users\renov\xxxvera\public\images\cases"

# Copiar todas as imagens
Copy-Item "C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso\*" -Destination "C:\Users\renov\xxxvera\public\images\cases\" -Recurse -Force
```

### Opção 2: Via Explorador de Arquivos
1. Abra o Explorador de Arquivos
2. Navegue até: `C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso`
3. Selecione todas as imagens (Ctrl+A)
4. Copie (Ctrl+C)
5. Navegue até: `C:\Users\renov\xxxvera\public\images\cases\`
6. Cole (Ctrl+V)

## 📝 Nomenclatura Sugerida

Baseado nas imagens dos cases que foram enviadas, renomeie os arquivos para:

### Cases de Unhas Encravadas
- `unha-encravada-antes-1.jpg`
- `unha-encravada-antes-2.jpg` 
- `unha-encravada-depois-1.jpg`
- `unha-encravada-depois-2.jpg`

### Cases de Micose/Onicomicose
- `micose-antes-1.jpg`
- `micose-antes-2.jpg`
- `micose-depois-1.jpg`
- `micose-depois-2.jpg`

### Cases de Reconstrução Ungueal
- `reconstrucao-antes-1.jpg`
- `reconstrucao-antes-2.jpg`
- `reconstrucao-depois-1.jpg`
- `reconstrucao-depois-2.jpg`

### Cases de Calosidades
- `calosidade-antes-1.jpg`
- `calosidade-antes-2.jpg`
- `calosidade-depois-1.jpg`
- `calosidade-depois-2.jpg`

### Procedimentos em Andamento
- `procedimento-1.jpg` (profissional trabalhando)
- `procedimento-2.jpg` (equipamentos/ambiente)
- `procedimento-3.jpg` (técnicas sendo aplicadas)

### Cases de Verrugas
- `verruga-antes-1.jpg`
- `verruga-depois-1.jpg`

### Cases Diabéticos
- `diabetico-antes-1.jpg`
- `diabetico-depois-1.jpg`

## ⚙️ Configuração Automática

Após copiar as imagens, o sistema automaticamente:

1. ✅ **Detectará as imagens** na pasta `/public/images/cases/`
2. ✅ **Carregará nos cards** da página de Cases de Sucesso
3. ✅ **Criará galerias** antes/depois para cada case
4. ✅ **Otimizará SEO** com alt text adequado
5. ✅ **Habilitará zoom** e visualização em modal

## 🔄 Comando PowerShell Completo

Execute este comando no PowerShell (como Administrador):

```powershell
# Navegar para o diretório do projeto
Set-Location "C:\Users\renov\xxxvera"

# Criar pasta cases se não existir
New-Item -ItemType Directory -Force -Path "public\images\cases"

# Copiar imagens da fonte
$source = "C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso\*"
$destination = "public\images\cases\"

if (Test-Path "C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso") {
    Copy-Item $source -Destination $destination -Recurse -Force
    Write-Host "✅ Imagens copiadas com sucesso!" -ForegroundColor Green
    Write-Host "📁 Destino: public/images/cases/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Pasta de origem não encontrada!" -ForegroundColor Red
    Write-Host "Verifique o caminho: C:\Users\renov\Desktop\aaaaaa\fotos de cases de sucesso" -ForegroundColor Yellow
}

# Listar arquivos copiados
Write-Host "`n📋 Arquivos na pasta cases:" -ForegroundColor Blue
Get-ChildItem "public\images\cases\" | ForEach-Object { Write-Host "   • $($_.Name)" -ForegroundColor White }
```

## 📱 Resultado Final

Depois de copiar as imagens, o site terá:

- ✅ **Página completa**: `/cases-de-sucesso` com imagens reais
- ✅ **Galeria interativa**: Antes/Depois de cada tratamento  
- ✅ **Cards na Home**: Destaque dos principais cases
- ✅ **SEO otimizado**: Meta tags com cases reais
- ✅ **WhatsApp integration**: Link direto por cada case
- ✅ **Responsivo**: Funciona em todos os dispositivos

## 🚨 Após Copiar as Imagens

1. **Reinicie o servidor** de desenvolvimento
2. **Acesse** http://localhost:3001/cases-de-sucesso
3. **Verifique** se as imagens aparecem nos cards
4. **Teste** a navegação e zoom das imagens
5. **Confirme** os links para WhatsApp

As imagens serão carregadas automaticamente pelos componentes já criados! 🎉