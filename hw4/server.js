const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk;
  });
  
  req.on('end', () => {
    setTimeout(() => {
      if (body) {
        console.log('Received request body:', body);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Response');
    }, 100);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
