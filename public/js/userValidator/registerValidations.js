//Capturar formulario
window.addEventListener ('load', function () {
    const formulario = document.querySelector('formulario');

    formulario.addEventListener ('submit', function (event){
        let errores = [];

    const campoNombre = document.querySelector('input.nombre');
    if (campoNombre.value == '') {
        errores.push('El campo nombre debe estar completo')
    }

    const campoApellido = document.querySelector('input.apellido');
    if (campoApellido.value == '') {
        errores.push('El campo apellido debe estar completo')
    }

    const campoFechaNacimiento = document.querySelector('input.fechaNacimiento');
    if (campoFechaNacimiento.value == '') {
        errores.push('El campo fecha de nacimiento debe estar completo')
    }

    const campoTelefono = document.querySelector('input.telefono');
    const caracteresOkTelefono = {
        email: /^[0-9]+$/,
    }
    if (campoTelefono.value == '') {
        errores.push('El campo teléfono debe estar completo')
    }

    const campoEmail = document.querySelector('input.email');
    const caracteresOkEmail = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }    
    
    if (campoEmail.value == '') {
        errores.push('El campo email debe estar completo');

    } else if (campoEmail.value.caracteresOk) {
        errores.push('El campo email debe tener caracteres válidos');
    }

    const campoPassword = document.querySelector('input.password');

    if (campoPassword.value == '') {
        errores.push('El campo password debe estar completo')
    } 
        
    if (errores.length > 0) {
        event.preventDefault();

        let ulErrores = document.querySelector('div.errores ul');
        for (let i = 0; i < errores.length; i++) {

            ulErrores.innerHTML += '<li>' + errores[i] + '</li>'
        }
    }
});
})