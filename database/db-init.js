const pool = require('./pool');

const DROP_USERS_QUERY = `DROP TABLE IF EXISTS users;`;
const DROP_PAINTS_QUERY = `DROP TABLE IF EXISTS paints;`;

const CREATE_USERS_QUERY = 
`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        permission VARCHAR(64)
    );
`;

const CREATE_PAINTS_QUERY = 
`
    CREATE TABLE IF NOT EXISTS paints (
        id SERIAL PRIMARY KEY,
        colour VARCHAR(64),
        status VARCHAR(64)
    );
`;

const INSERT_USERS_QUERY = 
`
    INSERT INTO users 
        (name, permission) 
    VALUES 
        ('John', 'view'),
        ('Jane', 'edit'),
        ('Adam', 'admin'),
        ('Painter', 'edit')
    ON CONFLICT DO NOTHING;
`;

const INSERT_PAINTS_QUERY = 
`
    INSERT INTO paints 
        (colour, status) 
    VALUES 
        ('Blue', 'out of stock'),
        ('Purple', 'running low'),
        ('White', 'running low'),
        ('Black', 'available'),
        ('Grey', 'available')
    ON CONFLICT DO NOTHING;
`;

initDb = () => {
    pool.connect()
        .then(client => {
            client.query(DROP_USERS_QUERY)
                .then(() => {
                    return client.query(CREATE_USERS_QUERY);
                })
                .then(() => {
                    return client.query(INSERT_USERS_QUERY);
                })
                .then(() => {
                    return client.query(DROP_PAINTS_QUERY);
                })
                .then(() => {
                    return client.query(CREATE_PAINTS_QUERY);
                })
                .then(() => {
                    return client.query(INSERT_PAINTS_QUERY);
                })
                .then(() => {
                    console.log('Database initialized.');
                    client.release();
                })
                .catch(error => {
                    client.release();
                    console.error(error);
                    throw error;
                });
     });
}

module.exports = initDb;