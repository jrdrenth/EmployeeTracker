const mysql = require('mysql');
const util = require('util');
require('dotenv').config();  // Enable access to .env variables

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

});

connection.connect((err) => { if (err) throw err; });

// Converts connection.query() to return responses in a promise instead of a callback, allowing for async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
