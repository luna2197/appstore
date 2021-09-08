const conexion = require('../db/conexionDB');

function login(user, password) {
    const SQL_LOGIN = "select *from tbluser where user=? and password=?";
    return new Promise((resolve, reject) => {
        conexion.query(SQL_LOGIN, [user, password], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado) 
        })
    })
}

module.exports={
    login:login
}