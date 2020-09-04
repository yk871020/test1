const http = require('http');
const router = require('./router');

const port = 8080;

http.createServer((req, res) => {
    router.route(req, res);
}).listen(port, () => {
    console.log('Server listening on http://localhost:%s/', port);
});