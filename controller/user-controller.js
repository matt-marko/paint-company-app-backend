const userModel = require('../model/user-model');

module.exports = {
    getAllUsers: (res) => {
        userModel.getAllUsers()
            .then(users => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(users));
            })
            .catch(error => {
                console.error(error);

                // TODO refactor to separate mehotd
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            });
    },

    getUserWithName: (res, path) => {
        const name = path.split('/')[2];

        userModel.getUserWithName(name)
            .then(user => {
                if (user) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(user));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Not found' }));
                }
            })
            .catch(error => {
                console.error(error);

                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            });
    },

    addUser: (req, res) => {
        let body = [];
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                body = JSON.parse(body);

                if (body.name && body.permission) {
                    userModel.addUser(body.name, body.permission)
                    .then(() => {
                        res.statusCode = 204;
                        res.end();
                    })
                    .catch(error => {
                        console.error(error);
        
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Internal Server Error' }));
                    });
                } else {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Request body incorrectly formatted' }));
                }
            });
    },

    updateUser: (req, res, path) => { 
        const name = path.split('/')[2];

        let body = [];
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();

                userModel.updateUser(name, body)
                .then(() => {
                    res.statusCode = 204;
                    res.end();
                })
                .catch(error => {
                    console.error(error);
    
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                });
            });
    },

    deleteUser: (res, path) => {
        const name = path.split('/')[2];

        userModel.deleteUser(name)
            .then(() => {
                res.statusCode = 204;
                res.end();
            })
            .catch(error => {
                console.error(error);

                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            });
    },
};