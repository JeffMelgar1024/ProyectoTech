const mysql = require('mysql');
const { mysql_database } = require('./config');


const connection = mysql.createConnection(mysql_database);

connection.connect((err, conn) => {
    if (err) {
        console.log("Error en conexion",err);
    } else {
        console.log('Conexión a la base de datos establecida');
        return conn;
    }
})

module.exports = connection;