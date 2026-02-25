const http = require('http');
const fs = require('fs');
const path = require('path');
 
const port = process.env.PORT || 3000;
const mensaje = process.env.WELCOME_MESSAGE || "¡Hola Mundo! Aplicación PaaS por defecto.";
 
const server = http.createServer((req, res) => {
  // 1. Manejar peticiones de archivos CSS (ej. cuando el HTML pide style.css)
  if (req.url.endsWith('.css')) {
    const cssPath = path.join(__dirname, req.url);
    fs.readFile(cssPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Archivo CSS no encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
    return; // Detenemos la ejecución aquí para que no intente cargar el HTML
  }
 
  // 2. Manejar la petición principal de la web (cargar index.html)
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error cargando el archivo index.html');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
 
      // Reemplazamos la etiqueta por la variable de entorno
      const htmlFinal = data.replace('{{WELCOME_MESSAGE}}', mensaje);
      res.end(htmlFinal);
    }
  });
});
 
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
