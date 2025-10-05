const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware para bypass do LocalTunnel
app.use((req, res, next) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  res.setHeader('User-Agent', 'VeraCare-Professional-Bot/1.0');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// Servir arquivos estáticos primeiro
app.use(express.static(path.join(__dirname, 'out')));

// Middleware para lidar com rotas do Next.js
app.use((req, res, next) => {
  res.setHeader('bypass-tunnel-reminder', 'true');
  
  const requestedPath = req.path === '/' ? '/index.html' : req.path;
  const filePath = path.join(__dirname, 'out', requestedPath);
  
  // Tenta servir o arquivo HTML correspondente
  if (req.path === '/') {
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
  } else if (fs.existsSync(filePath + '.html')) {
    res.sendFile(filePath + '.html');
  } else if (fs.existsSync(path.join(__dirname, 'out', req.path, 'index.html'))) {
    res.sendFile(path.join(__dirname, 'out', req.path, 'index.html'));
  } else {
    // Fallback para SPA
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