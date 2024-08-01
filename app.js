const http = require('http');
const database = require('./util/database.js');

const port = 8080;
const paintPath = '/paint';
const userPath = '/user'

const server = http.createServer((req, res) => {
    res.setHeader('Access-control-allow-origin', '*');

    if (req.url === paintPath) {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            database.connect();
        }
        res.write('You have accessed paint');
    } else if (req.url === userPath) {
        res.statusCode = 200;
        res.write('You have accessed user');   
    } else {
        res.statusCode = 404;
        res.write('Not found');  
    }

    res.end();
})

server.listen(port);