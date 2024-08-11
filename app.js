const http = require('http');
const { URL } = require('url');

const userController = require('./controller/user-controller');
const paintController = require('./controller/paint-controller');
const urlMatcher = require('./util/url-matcher');

const initDb = require('./database/db-init');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // TODO probably extract to method
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = decodeURIComponent(url.pathname);

    const usersMatch = urlMatcher.usersMatch(path);
    const usersWithNameMatch = urlMatcher.usersWithNameMatch(path);

    const paintsMatch = urlMatcher.paintsMatch(path);
    const paintsWithColourMatch = urlMatcher.paintsWithColourMatch(path);

    // Paint endpoints
    if (paintsMatch && req.method === 'GET') {
        paintController.getAllPaints(res);
    } else if (paintsWithColourMatch && req.method === 'GET') {
        paintController.getPaintWithColour(res, path);
    } else if (paintsMatch && req.method === 'POST') {
        paintController.addPaint(req, res);
    } else if (paintsMatch && req.method === 'PUT') {
        paintController.updateAllPaints(req, res);
    } else if (paintsWithColourMatch && req.method === 'PATCH') {
        paintController.updatePaint(req, res, path);
    } else if (paintsWithColourMatch && req.method === 'DELETE') {
        paintController.deletePaint(res, path);
    }
    
    // User endpoints
    else if (usersMatch && req.method === 'GET') {
        userController.getAllUsers(res);
    } else if (usersMatch && req.method === 'POST') {
        userController.addUser(req, res);
    } else if (usersWithNameMatch && req.method === 'PATCH') {
        userController.updateUser(req, res, path);
    } else if (usersWithNameMatch && req.method === 'GET') { 
        userController.getUserWithName(res, path);
    } else if (usersWithNameMatch && req.method === 'DELETE') {
        userController.deleteUser(res, path);
    } 
    
    // Set CORS policy in pre-flight request
    else if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
    } 
    
    // Not found
    else {
        res.statusCode = 404;
        res.write('Not found');  
        res.end();
    }
})

server.listen(PORT, () => {
    initDb();

    console.log(`Server is running on port ${PORT}`);
});