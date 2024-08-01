const pg = require('pg');
 
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

module.exports = {
  /*connect: client.connect((err) => {
    client.query('SELECT * FROM paints', (err, res) => {
      console.log(err ? err.stack : res.rows[0].message);
      client.end();
    });
  })*/
  connect: () => {
    pool.connect();
  }
};