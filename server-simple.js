const express = require('express');
const path = require('path');
const app = express();

// Middleware para bypass do LocalTunnel
app.use((req, res, next) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  res.setHeader('User-Agent', 'VeraCare-Professional-Bot/1.0');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'out')));

// Fallback para SPA
app.get('/', (req, res) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Rota para todas as páginas do Next.js
app.get('/*', (req, res) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  
  // Se o arquivo existe, serve ele
  const requestedFile = path.join(__dirname, 'out', req.path);
  const fs = require('fs');
  
  if (fs.existsSync(requestedFile + '.html')) {
    res.sendFile(requestedFile + '.html');
  } else if (fs.existsSync(requestedFile + '/index.html')) {
    res.sendFile(requestedFile + '/index.html');
  } else {
    // Fallback para index
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log('🦶 VeraCare Podóloga - Server iniciado!');
  console.log(`🌍 Servidor rodando em: http://0.0.0.0:${PORT}`);
  console.log('🚀 LocalTunnel bypass configurado');
});

module.exports = app;