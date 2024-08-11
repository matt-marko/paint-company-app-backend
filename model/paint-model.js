const pool = require('../database/pool');

// TODO all these returns may not be necessary
module.exports = {
    getAllPaints: () => {
        return pool.connect()
            .then(client => {
                return client.query('SELECT * FROM paints')
                    .then(response => {
                        client.release();
                        return response.rows;
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw error;
                    });
            });
    },

    getPaintWithColour: (colour) => {
        return pool.connect()
            .then(client => {
                return client.query('SELECT * FROM paints WHERE colour = $1', [colour])
                    .then(response => {
                        client.release();
                        return response.rows[0];
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw error;
                    });
            });
    },

    addPaint: (colour, status) => {
        return pool.connect()
            .then(client => {
                return client.query('INSERT INTO paints (colour, status) VALUES ($1, $2)', [colour, status])
                    .then(response => {
                        client.release();
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw error;
                    });
            });
    },

    updatePaint: (colour, status) => {
        return pool.connect()
            .then(client => {
                return client.query('UPDATE paints SET status = $2 WHERE colour = $1;', [colour, status])
                    .then(response => {
                        client.release();
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw error;
                    });
            });
    },

    updateAllPaints: (paints) => {
        return pool.connect()
            .then(client => {
                return client.query('DELETE FROM paints WHERE 1=1;')
                    .then(() => {
                        const paintInserts = paints.map(paint => {
                            return client.query('INSERT INTO paints (colour, status) VALUES ($1, $2);', [paint.colour, paint.status]);
                        });
                    
                        return Promise.all(paintInserts);
                    })
                    .then(() => {
                        return client.query('SELECT * FROM paints;')
                    })
                    .then(response => {
                        client.release();
                        return response.rows;
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw error;
                    });
            });
    },

    deletePaint: (colour) => {
        return pool.connect()
            .then(client => {
                return client.query('DELETE FROM paints WHERE colour = $1', [colour])
                    .then(response => {
                        client.release();
                    })
                    .catch(error => {
                        client.release();
                        console.error(error);
                        throw err;
                    });
            });
    },
};