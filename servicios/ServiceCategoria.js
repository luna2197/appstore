//Importacion de conexion y consulta
const conexion = require('../db/conexionDB');
const consulta = require('../utilidades/consultaCategoria.json');


//Metodo seleccion CategoriaByID
function SeleccionarCategoriaById(idCategoria) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectByIdCategoria, [idCategoria], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
    
}



//Metodo Seleccionar Categorias
function seleccionarCategoria() {

    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectCategoria, (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })

}

//Metodo Agregar Categorias
function agregarCategoria(descripcion) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.insertCategoria, [descripcion], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

//Metodo Actualizar Categorias

function actualizarCategoria(nombre, idCategoria) {

    return new Promise((resolve, reject) => {
        conexion.query(consulta.updateCategoria, [nombre, idCategoria], (error, resultado) => {
            if (error) reject(error)
            else resolve(resultado)
        })
    })

}

//Metodo eliminar Categorias
function eliminarCategoria(idCategoria) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.deleteCategoria, [idCategoria], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })

}

//Creacion de modulo
module.exports = {
    seleccionarCategoria: seleccionarCategoria,
    agregarCategoria: agregarCategoria,
    actualizarCategoria: actualizarCategoria,
    eliminarCategoria: eliminarCategoria,
    SeleccionarCategoriaById :SeleccionarCategoriaById

}