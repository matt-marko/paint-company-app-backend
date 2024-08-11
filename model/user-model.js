const pool = require('../database/pool');

// TODO all these returns may not be necessary
module.exports = {
    getAllUsers: () => {
        return pool.connect()
            .then(client => {
                return client.query('SELECT * FROM users')
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

    getUserWithName: (name) => {
        return pool.connect()
            .then(client => {
                return client.query('SELECT * FROM users WHERE name = $1', [name])
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

    addUser: (name, permission) => {
        return pool.connect()
            .then(client => {
                return client.query('INSERT INTO users (name, permission) VALUES ($1, $2)', [name, permission])
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

    updateUser: (name, permission) => {
        return pool.connect()
            .then(client => {
                return client.query('UPDATE users SET permission = $2 WHERE name = $1;', [name, permission])
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

    deleteUser: (name) => {
        return pool.connect()
            .then(client => {
                return client.query('DELETE FROM users WHERE name = $1', [name])
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