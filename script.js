const submitFuncion = (event) => {
    //Si viene en false, es decir que no se pudo validar muestra los errores
    if(!validarFormulario()){
        event.preventDefault(); //Previene la actualizacion de la web
    }else{
        event.preventDefault();
        alert(
            'Los datos enviados fueron: \n' +
            'Nombre: ' + document.getElementById('nombre').value + '\n'+
            'Apellido: ' + document.getElementById('apellido').value + '\n'+
            'Documento: ' + document.getElementById('documento').value + '\n'+
            'Email: ' + document.getElementById('email').value + '\n'+
            'Edad: ' + document.getElementById('edad').value + '\n'+
            'Actividad: ' + document.getElementById('actividad').value + '\n'+
            'Nivel de Estudio: ' + document.getElementById('nivelEstudio').value + '\n'
        )
    }
}

document.getElementById('formulario').addEventListener('submit', submitFuncion) //escucha el envio del formulario

function validarFormulario() {
    //obtengo una coleccion de todos los campos de texto
    const camposTexto = document.querySelectorAll('input[type="text"]')
    let validacionCorrecta = true;

    camposTexto.forEach(campo => {
        //error Apellido (por ejemplo)
        let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))
        if (campo.value.length == ''){
            mostrarError(errorCampo, '¡Este campo es requerido!');
            validacionCorrecta = false;
        }else if(campo.value.length > 0 && campo.value.length < 3){
            mostrarError(errorCampo, '¡Este campo debe tener al menos 3 caracteres!');
            validacionCorrecta = false;
        }else{
            ocultarError(errorCampo);
        }
    })

    const email = document.getElementById('email');
    let errorEmail = document.getElementById('errorEmail')

    //Chequea que el formato sea de email
    /*Expresión regular:
        ^[^\s@]+    verifica que no haya espacios ni el símbolo @ al inicio.
        @[^\s@]+    requiere que haya exactamente un @ seguido de caracteres válidos.
        \.[^\s@]+$  asegura que haya un punto seguido de una secuencia de caracteres válidos al final.
                    Esto es suficiente para validar un formato básico de correo electrónico. 
    */
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        ocultarError(errorEmail);
    }else{
        mostrarError(errorEmail, '¡Ingrese un correo electronico válido!')
        validacionCorrecta = false;
    }


    //Validacion de edad
    const edad = document.getElementById('edad');
    let errorEdad = document.getElementById('errorEdad');

    if(edad.value < 18){
        mostrarError(errorEdad, '¡Debes ser mayor de 18 años para registrarte!')
        validacionCorrecta = false;
    }else{
        ocultarError(errorEdad);
    }

    //Validacion de la actividad
    const actividad = document.getElementById('actividad');
    const errorActividad = document.getElementById('errorActividad');

    if(actividad.value == ''){
        mostrarError(errorActividad, 'Por favor selecciona una actividad');
        validacionCorrecta = false;
    }else{
        ocultarError(errorActividad);
    }

    //Validacion del nivel de estudio
    const nivelEstudio = document.getElementById('nivelEstudio');
    const errorNivelEstudio = document.getElementById('errorNivelEstudio');

    if(nivelEstudio.value == ''){
        mostrarError(errorNivelEstudio, 'Por favor selecciona un nivel de estudio');
        validacionCorrecta = false;
    }else{
        ocultarError(errorNivelEstudio);
    }

    //Validar los terminos y condiciones

    const aceptoTerminos = document.getElementById('aceptoTerminos');
    const errorAceptoTerminos = document.getElementById('errorAceptoTerminos');

    if(!aceptoTerminos.checked){
        mostrarError(errorAceptoTerminos, '¡Debes Aceptar los terminos y condiciones!')
        validacionCorrecta = false;
    }else{
        ocultarError(errorAceptoTerminos);
    }
    
    return validacionCorrecta;
}

const mostrarError = (elemento, mensaje) => {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

const ocultarError = (elemento) => {
    elemento.textContent = '';
    elemento.style.display = "none";
}

