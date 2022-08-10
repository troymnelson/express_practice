const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'express_practice',
    user: 'root'
});

module.exports = connection;