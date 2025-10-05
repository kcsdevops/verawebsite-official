# 🌐 Como Expor o Site VeraCare na Internet

## 🚀 **Opções Disponíveis (da mais simples para a mais avançada)**

### **1. Ngrok - Túnel Temporário (RECOMENDADO para teste)**

#### **Passo 1: Baixar Ngrok**
1. Acesse: https://ngrok.com/download
2. Baixe para Windows
3. Extraia o arquivo `ngrok.exe`
4. Coloque em uma pasta (ex: `C:\ngrok\`)

#### **Passo 2: Usar Ngrok**
```powershell
# No PowerShell, navegue até onde está o ngrok.exe
cd C:\ngrok

# Exponha a porta 3001 (onde seu site está rodando)
./ngrok http 3001
```

#### **Resultado:**
- ✅ URL pública instantânea: `https://abc123.ngrok.io`
- ✅ Funciona imediatamente
- ✅ HTTPS automático
- ❌ URL muda toda vez que reinicia
- ❌ Grátis tem limitações

---

### **2. LocalTunnel - Alternativa ao Ngrok**

#### **Instalação:**
```powershell
npm install -g localtunnel
```

#### **Uso:**
```powershell
lt --port 3001 --subdomain veracare
```

#### **Resultado:**
- ✅ URL: `https://veracare.loca.lt`
- ✅ Pode escolher subdomínio
- ✅ Gratuito

---

### **3. Vercel - Deploy Profissional (RECOMENDADO para produção)**

#### **Passo 1: Instalar Vercel CLI**
```powershell
npm install -g vercel
```

#### **Passo 2: Deploy**
```powershell
# Na pasta do projeto
cd C:\Users\renov\xxxvera

# Fazer login
vercel login

# Deploy
vercel --prod
```

#### **Resultado:**
- ✅ URL profissional: `https://veracare.vercel.app`
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ Performance otimizada
- ✅ Domínio personalizado possível

---

### **4. Netlify - Alternativa ao Vercel**

#### **Opção A: Drag & Drop**
1. Gere build: `npm run build`
2. Acesse: https://netlify.com
3. Arraste pasta `out` ou `.next`

#### **Opção B: CLI**
```powershell
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

---

### **5. GitHub Pages + Actions (Gratuito)**

#### **Passo 1: Configurar GitHub Actions**
Criar arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main, master ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build && npm run export
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

---

## 🎯 **SOLUÇÃO RÁPIDA - Ngrok**

### **Comandos Diretos:**

```powershell
# 1. Baixar ngrok
# Vá em: https://ngrok.com/download

# 2. Extrair e usar
cd C:\caminho\para\ngrok
./ngrok http 3001

# 3. Copiar URL que aparece (ex: https://abc123.ngrok-free.app)
```

### **Exemplo de Resultado:**
```
ngrok                                                                                                                                                                                     
                                                                                                                                                                                          
Session Status                online                                                                                                                                                      
Account                       your@email.com (Plan: Free)                                                                                                                               
Version                       3.3.5                                                                                                                                                       
Region                        United States (us)                                                                                                                                          
Latency                       -                                                                                                                                                           
Web Interface                 http://127.0.0.1:4040                                                                                                                                      
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3001                                                                                                    
                                                                                                                                                                                          
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                                                                 
                              0       0       0.00    0.00    0.00    0.00
```

---

## 🔧 **Configuração para Produção**

### **Para Vercel (Recomendado):**

1. **Instalar e configurar:**
```powershell
npm install -g vercel
vercel login
```

2. **Deploy:**
```powershell
vercel --prod
```

3. **Configurar domínio personalizado:**
- Adicionar: `veracare.com.br`
- Configurar DNS: CNAME para Vercel

---

## 📱 **Configurações do Next.js**

### **Para funcionamento correto em produção:**

Arquivo `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### **Scripts do package.json:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export"
  }
}
```

---

## ⚡ **MÉTODO MAIS RÁPIDO AGORA:**

1. **Baixar Ngrok:** https://ngrok.com/download
2. **Extrair arquivo**
3. **Executar no PowerShell:**
```powershell
cd C:\caminho\para\ngrok
./ngrok http 3001
```
4. **Copiar URL gerada** (ex: https://abc123.ngrok-free.app)
5. **Compartilhar URL** - site estará acessível na internet!

---

## 🌟 **Para Uso Profissional:**

- **Curto prazo**: Ngrok (teste rápido)
- **Longo prazo**: Vercel + domínio próprio
- **Empresa**: Servidor dedicado + domínio

### **Domínio Personalizado:**
1. Comprar: `veracare.com.br`
2. Configurar DNS para apontar para Vercel
3. Configurar SSL (automático no Vercel)

**🚀 O site estará profissionalmente acessível na internet!**