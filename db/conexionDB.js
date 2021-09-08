const mysql = require('mysql')
const properties = require('../cadenaConexion.json')

module.exports = mysql.createConnection({
    host: process.env.DB_HOST || properties.host,
    user: process.env.DB_USER || properties.usuario,
    password: process.env.DB_PASSWORD || properties.cantrasena,
    database: process.env.DB_DATABASE || properties.baseDatos
});