const http = require('http');
const fs = require('fs');
const exts = {html:'text/html',css:'text/css',js:'application/javascript',mp4:'video/mp4',webm:'video/webm',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',gif:'image/gif',svg:'image/svg+xml',ico:'image/x-icon',woff:'font/woff',woff2:'font/woff2'};
http.createServer((req,res) => {
    let p = req.url === '/' ? '/index.html' : req.url;
    let ext = p.split('.').pop();
    let mime = exts[ext] || 'text/plain';
    try {
        let data = fs.readFileSync('.' + p);
        res.writeHead(200, {'Content-Type': mime});
        res.end(data);
    } catch(e) {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(8081, () => console.log('Server at http://127.0.0.1:8081/'));
