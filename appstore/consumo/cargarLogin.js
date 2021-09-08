var configuraciones = config;


function login(usuario, contra) {
   
    cadena = usuario + "/" + contra;

    $.ajax(configuraciones.hostApi + configuraciones.insertarLogin + cadena,  {
        type: "post",
        datatype: 'json',
        contentType: 'application/json',
        success: function (data, status) {
            sessionStorage.setItem('token', data.mensaje);
            window.open("/html/menu.html", "_self")
        },
        error: function (jqXhr, textStatus, erroMensaje) {
            if (jqXhr.status == 400) {
                alert('Usuario no existe en el sistema')
            } else {
                alert('Ocurrio un error')
            }
            
        }
    })
    
}


$('#login').click(function () {
    let usuario = $('#user').val();
    let contra = $('#pass').val();
    console.log(usuario + " " + contra)
    login(usuario, contra);
})