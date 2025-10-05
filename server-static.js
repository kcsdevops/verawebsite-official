const express = require('express');
const path = require('path');
const app = express();

// Middleware para bypass do LocalTunnel e headers profissionais
app.use((req, res, next) => {
  // Headers para bypass do LocalTunnel
  res.setHeader('bypass-tunnel-reminder', 'true');
  
  // Headers personalizados para evitar detecção de tunnel
  res.setHeader('User-Agent', 'VeraCare-Professional-Bot/1.0');
  
  // Headers para controlar cache e remover mensagens indesejadas
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Remove headers do LocalTunnel
  res.removeHeader('X-Powered-By');
  
  // Headers de segurança profissionais
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Middleware específico para requisições de entrada (bypass LocalTunnel)
app.use((req, res, next) => {
  // Definir headers de bypass nas requisições
  req.headers['bypass-tunnel-reminder'] = 'true';
  req.headers['user-agent'] = 'VeraCare-Professional-Site/1.0 (Podiatry-Clinic)';
  
  next();
});

// Configurar para servir arquivos estáticos da pasta 'out'
app.use(express.static(path.join(__dirname, 'out'), {
  setHeaders: (res, path) => {
    // Headers de segurança para assets
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('bypass-tunnel-reminder', 'true');
  }
}));

// Rota específica para webhook/API calls (força bypass)
app.use('/api', (req, res, next) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  res.setHeader('User-Agent', 'VeraCare-API-Client/1.0');
  next();
});

// Fallback para SPA - usando middleware
app.use((req, res) => {
  // Headers finais de bypass
  res.setHeader('bypass-tunnel-reminder', 'true');
  res.setHeader('X-Tunnel-Bypass', 'VeraCare-Professional');
  
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Porta configurável via variável de ambiente
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log('🦶 VeraCare Podóloga - Server iniciado!');
  console.log(`🌍 Servidor rodando em: http://0.0.0.0:${PORT}`);
  console.log('📁 Servindo arquivos de: ./out');
  console.log(`🔗 Acesse: http://localhost:${PORT}`);
  console.log('✨ Configurado para produção profissional');
  console.log('🚀 LocalTunnel bypass headers configurados');
});

module.exports = app;