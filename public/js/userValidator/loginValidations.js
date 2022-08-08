//Capturar formulario
window.addEventListener ('load', function () {
    const formulario = document.querySelector('formulario');

    formulario.addEventListener ('submit', function (event){
        let errores = [];

    const campoEmail = document.querySelector('input.email');
    const caracteresOk = {
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