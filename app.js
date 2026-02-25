const http = require('http');
const port = process.env.PORT || 8080;
const mensaje = process.env.WELCOME_MESSAGE || "¡Hola Mundo! Aplicación PaaS por defecto.";
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<h1>${mensaje}</h1><p>Esta app está corriendo en un servicio PaaS.</p>`);
});
 
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
