//Importacion de modulos
const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken')

//Servicios
const servicioCategoria = require('./servicios/ServiceCategoria');
const servicioComentario = require('./servicios/ServiceComentario');
const servicioImagen = require('./servicios/ServiceImagen');
const servicioAplicacion = require('./servicios/ServiceAplicacion');
const servicioLogin = require('./servicios/ServiceLogin')

//Mensajes 
const mensaje = require('./utilidades/Mensajes.json');

//Validacion
const validador = require('./servicios/validacion');


//express
const app = express();

app.use(bodyparser.json());

app.use(express.static(__dirname + '/appstore'));

app.get('/', (req, res) => {
    res.redirect('index.html')
});

//-------------------------------------------------------------------------------------------------------------
//Tabla Categoria

//SELECT*FROM
app.get('/Categoria', (req, res) => {
    servicioCategoria.seleccionarCategoria()
        .then(data => {
                res.status(200).send(data);
            }

        )
        .catch(error => {
            res.status(500).send(mensaje.mensajeError + error);
        })
})

//INSERT INTO 
app.post('/AgregarCategoria', (req, res) => {
    let descripcion = req.body.descripcion;

    let resp = {
        status: 200,
        mensaje: ""
    }
    console.log(descripcion);
    if (!validador.validarDatos(descripcion)) {
        resp.status = 400;
        resp.mensaje = mensaje.MensajeValidador;

        res.set({
            "Context-Type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp))
    }

    servicioCategoria.agregarCategoria(descripcion)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(resp))
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Context-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//Update SET
app.put('/ActualizarCategoria/:idCategoria', (req, res) => {
    //recibiendo del body
    let descripcion = req.body.descripcion;
    //recibiendo del parametro
    let idCategoria = req.params.idCategoria;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(descripcion) || !validador.validarDatos(idCategoria)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }

    servicioCategoria.actualizarCategoria(descripcion, idCategoria)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"

            })
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//DELETE
app.delete('/eliminarCategoria/:idCategoria', (req, res) => {

    let idCategoria = req.params.idCategoria;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(idCategoria)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }

    servicioCategoria.eliminarCategoria(idCategoria)
    resp.mensaje = mensaje.mensajeOK;
    res.set({
        "Context-type": "Text/json"

    })
    return res.status(200).send(JSON.stringify(resp));
})

//-------------------------------------------------------------------------------------------------------------
//Tabla comentario

//SELECT*FROM
app.get('/Comentario', (req, res) => {
    servicioComentario.seleccionarComentario()
        .then(data => {
                res.status(200).send(data);
            }

        )
        .catch(error => {
            res.status(500).send(mensaje.mensajeError + error);
        })
})

//INSERT INTO 
app.post('/AgregarComentario', (req, res) => {
    let comentario = req.body.comentario;
    let codigoAplicacion = req.body.codigoAplicacion;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(comentario) || !validador.validarDatos(codigoAplicacion)) {
        resp.status = 400;
        resp.mensaje = mensaje.MensajeValidador;

        res.set({
            "Context-Type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp))
    }

    servicioComentario.agregarComentario(comentario, codigoAplicacion)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(resp))
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Context-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//Update SET
app.put('/ActualizarComentario/:idImagen', (req, res) => {
    //recibiendo del body
    let comentario = req.body.comentario;
    let codigoAplicacion = req.body.codigoAplicacion;
    //recibiendo del parametro
    let idImagen = req.params.idImagen;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(comentario) || !validador.validarDatos(codigoAplicacion) || !validador.validarDatos(idImagen)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }


    servicioComentario.actualizarComentario(comentario, codigoAplicacion, idImagen)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"

            })
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//DELETE
app.delete('/eliminarComentario/:idImagen', (req, res) => {

    let idImagen = req.params.idImagen;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(idImagen)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }

    servicioComentario.eliminarComentario(idImagen)
    resp.mensaje = mensaje.mensajeOK;
    res.set({
        "Context-type": "Text/json"

    })
    return res.status(200).send(JSON.stringify(resp));
})

//-------------------------------------------------------------------------------------------------------------
//Tabla imagen

//SELECT*FROM
app.get('/Imagen', (req, res) => {
    servicioImagen.seleccionarImagen()
        .then(data => {
                res.status(200).send(data);
            }

        )
        .catch(error => {
            res.status(500).send(mensaje.mensajeError + error);
        })
})

//INSERT INTO 
app.post('/AgregarImagen', (req, res) => {
    let url = req.body.url;
    let codigoAplicacion = req.body.codigoAplicacion;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(url) || !validador.validarDatos(codigoAplicacion)) {
        resp.status = 400;
        resp.mensaje = mensaje.MensajeValidador;

        res.set({
            "Context-Type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp))
    }

    servicioImagen.agregarImagen(url, codigoAplicacion)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(resp))
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Context-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//Update SET
app.put('/ActualizarImagen/:idImagen', (req, res) => {
    //recibiendo del body
    let url = req.body.url;
    let codigoAplicacion = req.body.codigoAplicacion;
    //recibiendo del parametro
    let idImagen = req.params.idImagen;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(url) || !validador.validarDatos(codigoAplicacion) || !validador.validarDatos(idImagen)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }


    servicioImagen.actualizarImagen(url, codigoAplicacion, idImagen)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"

            })
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//DELETE
app.delete('/eliminarImagen/:idImagen', (req, res) => {

    let idImagen = req.params.idImagen;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(idImagen)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }

    servicioImagen.eliminarImagen(idImagen)
    resp.mensaje = mensaje.mensajeOK;
    res.set({
        "Context-type": "Text/json"

    })
    return res.status(200).send(JSON.stringify(resp));
})

//-------------------------------------------------------------------------------------------------------------
//Tabla aplicacion

//SELECT*FROM
app.get('/Aplicacion', (req, res) => {
    servicioAplicacion.seleccionarAplicacion()
        .then(data => {
                res.status(200).send(data);
            }

        )
        .catch(error => {
            res.status(500).send(mensaje.mensajeError + error);
        })
})

//INSERT INTO 
app.post('/AgregarAplicacion', (req, res) => {
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let descripcion = req.body.descripcion;
    let icono = req.body.icono;
    let idCategoria = req.body.idCategoria;

    let resp = {
        status: 200,
        mensaje: ""
    }
    console.log(nombre)
    console.log(precio)
    console.log(descripcion)
    console.log(icono)
    console.log(idCategoria)
    /* if (!validador.validarDatos(nombre) || !validador.validarDatos(precio) || !validador.validarDatos(descripcion) || !validador.validarDatos(icono) || !validador.validarDatos(idCategoria)) {
        resp.status = 400;
        resp.mensaje = mensaje.MensajeValidador;

        res.set({
            "Context-Type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp))
    } */

    servicioAplicacion.agregarAplicacion(nombre, precio, descripcion, icono, idCategoria)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"
            })
            return res.status(200).send(JSON.stringify(resp))
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Context-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//Update SET
app.put('/ActualizarAplicacion/:codigo', (req, res) => {
    //recibiendo del body
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let descripcion = req.body.descripcion;
    let icono = req.body.icono;
    let idCategoria = req.body.idCategoria;
    //recibiendo del parametro
    let codigo = req.params.codigo;

    let resp = {
        status: 200,
        mensaje: ""
    }

    /* if (!validador.validarDatos(nombre) || !validador.validarDatos(precio) || !validador.validarDatos(descripcion) || !validador.validarDatos(icono) || !validador.validarDatos(idCategoria)) {
        resp.status = 400;
        resp.mensaje = mensaje.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }
 */

    servicioAplicacion.actualizarAplicacion(nombre, precio, descripcion, icono, idCategoria, codigo)
        .then(data => {
            resp.mensaje = mensaje.mensajeOK;
            res.set({
                "Context-type": "Text/json"

            })
            return res.status(200).send(JSON.stringify(resp));
        })
        .catch(data => {
            resp.status = 500;
            res.set({
                "Content-type": "Text/json"
            })
            resp.mensaje = mensajes.mensajeError
            return res.status(200).send(JSON.stringify(resp));
        })

})

//DELETE
app.delete('/eliminarAplicacion/:codigo', (req, res) => {

    let codigo = req.params.codigo;

    let resp = {
        status: 200,
        mensaje: ""
    }

    if (!validador.validarDatos(codigo)) {
        resp.status = 400;
        resp.mensaje = mensajes.MensajeValidador

        res.set({
            "Content-type": "Text/json"
        })
        return res.status(400).send(JSON.stringify(resp));

    }

    servicioAplicacion.eliminarAplicacion(codigo)
    resp.mensaje = mensaje.mensajeOK;
    res.set({
        "Context-type": "Text/json"

    })
    return res.status(200).send(JSON.stringify(resp));
})

//Catalogo
//SELECT*FROM
//Mandamos a llamar el catalogo segun el Id de la Categoria
app.get('/CatalogoCategoria/:idCategoria', (req, res) => {
    //Obtener parametro 
    let idCategoria = req.params.idCategoria;
    //Creacion de un arreglo llamado catalago
    let catalogo = [{
        descripcion: "",
        aplicaciones: []
    }]
    //Arreglo para imagenes y comentarios
    let imagenes = [];
    let comentarios = [];

    //Servicio (SELECT * FROM tblimagenaplicacion
     servicioImagen.seleccionarImagen()
                .then(data3 => {
                    //Guardamos todos los datos dentro del arreglo imagenes
                    for (let j = 0; j < data3.length; j++) {

                        imagenes.push(data3[j])
                        
                    }})
                    .catch(error => {
                        res.status(500).send(mensaje.mensajeError + error);
                    })
    //Servicio (SELECT * FROM tblcomentarioaplicacion)
     servicioComentario.seleccionarComentario()
                    .then(data4 => {
                        //Guardando los datos en el arrego comentarios
                        for (let k = 0; k < data4.length; k++) {

                            comentarios.push(data4[k]);
                        }})
                        .catch(error => {
                            res.status(500).send(mensaje.mensajeError + error);
                        }) 
    
    //Servicio (SELECT * FROM tblcategoria Where idCategoria=?)
    servicioCategoria.SeleccionarCategoriaById(idCategoria)
        .then(data => {
            //Agregando la descripcion al catalogo
            catalogo[0].descripcion = data[0].descripcion
                            //Servicio (SELECT * FROM tblaplicacion Where idCategoria=?)
                            servicioAplicacion.SeleccionarAplicacionById(idCategoria)
                                .then(data2 => {

                                    for (let i = 0; i < data2.length; i++) {
                                        //Declarando atributos en aplicacion
                                        data2[i] = {...data2[i], Imagenes: []};
                                        data2[i] = {...data2[i], Comentarios: []};
                                        //Obteniedo en parametro del codigo de la aplicacion
                                        let codApp = data2[i].codigo;
                                        //Agregando a catalogo la aplicacion
                                        catalogo[0].aplicaciones.push(data2[i]);
                                       
                                        //Recorriendo imagenes 
                                        for (let a = 0; a < imagenes.length; a++) {
                                            
                                            //Si el codigoAplicacion de la imagen es igual al codigo de la aplicacion
                                            if (imagenes[a].codigoAplicacion == codApp ) {
                                                //Agregamos la url al arreglo de imagenes
                                                let img = imagenes[a].url
                                                catalogo[0].aplicaciones[i].Imagenes.push(img)
                                               
                                            }
                                            
                                        }
                                         //Recorriendo comentarios
                                        for (let b = 0; b < comentarios.length; b++) {
                                            //Si el codigoAplicacion de comentarios es igual al codigo de la aplicacion
                                            if (comentarios[b].codigoAplicacion == codApp ) {
                                                //Agregamos los comentarios al arreglo de Comentarios
                                                catalogo[0].aplicaciones[i].Comentarios.push(comentarios[b]);
                                               
                                            }
                                            
                                        }
                                    }
                                    //Retornamos el catalogo
                                    res.status(200).send(catalogo);
                                })
                                .catch(error => {
                                    res.status(500).send(mensaje.mensajeError + error);
                                })
                            //   

        })
        .catch(error => {
            res.status(500).send(mensaje.mensajeError + error);
        })

})

const TOKEN_SECRET = "betheone$2021";

//vamos a generar nuestro token
function generarJWT(userName, password) {
    // return jwt.sign(userName, TOKEN_SECRET, { expiresIn: 60 * 60 })
    return jwt.sign(userName + password, TOKEN_SECRET);
}

function autenticarToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.status(401).json({"Mensaje":"Debe iniciar sesion"})

        req.user = user

        next();
    })

}

app.post('/login/:user/:pass', (req, res) => {

    let user = req.params.user;
    let pass = req.params.pass;
    let token = "";

    servicioLogin.login(user, pass)
        .then(data => {
            if (data[0]!=undefined && data[0]!=null) {
                token = generarJWT(user,pass);
                return res.status(200).json({
                    "mensaje": token
                })
            } else {
                return res.status(400).json({
                    "mensaje": "Usuario no existe"
                })
            }

        })
        .catch(error => {
            return res.status(500).json({
                "mensaje": "Ocurrio un error"
            })
        })

})

app.listen(3000);