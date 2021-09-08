const conexion = require('../db/conexionDB');
const consulta = require('../utilidades/consultaImagen.json');

//Metodo para listar Imagenes
function seleccionarImagen() {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectImagen, (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}
//Metodo para listar Imagenes por id
function seleccionarImagenByID(codigoAplicacion) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.selectImagenbyID, [codigoAplicacion], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

//Metodo para Agregar Imagenes
function agregarImagen(url, codigoAplicacion) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.insertImagen, [url, codigoAplicacion], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

//Metodo para actualizar Imagen
function actualizarImagen(url, codigoAplicacion, idImagen) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.updateImagen, [url, codigoAplicacion, idImagen], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

//Metodo para eliminar Imagen
function eliminarImagen(idImagen) {
    return new Promise((resolve, reject) => {
        conexion.query(consulta.deleteImagen, [idImagen], (error, resultado) => {
            if (error) {
                reject(error)
            } else {
                resolve(resultado)
            }
        })
    })
}

module.exports = {
    seleccionarImagen: seleccionarImagen,
    agregarImagen: agregarImagen,
    actualizarImagen: actualizarImagen,
    eliminarImagen: eliminarImagen,
    seleccionarImagenByID :seleccionarImagenByID
}