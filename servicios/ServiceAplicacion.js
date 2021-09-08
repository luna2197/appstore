//Importacion de conexion y consulta
const conexion = require('../db/conexionDB');
const consulta = require('../utilidades/consultaAplicacion.json');

//Metodo Seleccionar Aplicacion
function seleccionarAplicacion() {

    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectAplicacion, (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })

}


//Metodo seleccion CategoriaByID
function SeleccionarAplicacionById(idCategoria) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectAplicacionByID, [idCategoria], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
    
}


//Metodo Agregar Aplicacion
function agregarAplicacion(nombre, precio, descripcion, icono, idCategoria) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.insertAplicacion, [nombre, precio, descripcion, icono, idCategoria], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

//Metodo Actualizar Aplicacion

function actualizarAplicacion(nombre, precio, descripcion, icono, idCategoria, codigo) {

    return new Promise((resolve, reject) => {
        conexion.query(consulta.updateAplicacion, [nombre, precio, descripcion, icono, idCategoria, codigo], (error, resultado) => {
            if (error) reject(error)
            else resolve(resultado)
        })
    })

}

//Metodo eliminar Aplicacion
function eliminarAplicacion(codigo) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.deleteAplicacion, [codigo], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })

}

module.exports = {
    seleccionarAplicacion : seleccionarAplicacion,
    actualizarAplicacion : actualizarAplicacion,
    agregarAplicacion : agregarAplicacion,
    eliminarAplicacion : eliminarAplicacion,
    SeleccionarAplicacionById : SeleccionarAplicacionById
}