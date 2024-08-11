const paintModel = require('../model/paint-model');

module.exports = {
    getAllPaints: (res) => {
        paintModel.getAllPaints()
            .then(paints => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(paints));
            })
            .catch(error => {
                console.error(error);

                // TODO refactor to separate mehotd
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
            });
    },

    getPaintWithColour: (res, path) => {
        const colour = path.split('/')[2];

        paintModel.getPaintWithColour(colour)
            .then(paint => {
                if (paint) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(paint));
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

    addPaint: (req, res) => {
        let body = [];
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                body = JSON.parse(body);

                if (body.colour && body.status) {
                    paintModel.addPaint(body.colour, body.status)
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

    updatePaint: (req, res, path) => {
        const colour = path.split('/')[2];

        let body = [];
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();

                paintModel.updatePaint(colour, body)
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

    updateAllPaints: (req, res) => {
        let body = [];
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                body = JSON.parse(body);

                paintModel.updateAllPaints(body)
                .then((paints) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(paints));
                })
                .catch(error => {
                    console.error(error);
    
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                });
            });
    },

    deletePaint: (res, path) => {
        const colour = path.split('/')[2];

        paintModel.deletePaint(colour)
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