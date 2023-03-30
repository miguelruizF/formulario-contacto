const d = document;

d.addEventListener("DOMContentLoaded", ()=>{
    const formulario = d.querySelector("#formulario");
    const btnSubmit = d.querySelector("#btn_submit");
    const inputName = d.querySelector("#nombre");
    const inputTel = d.querySelector("#telefono");
    const inputEmail = d.querySelector("#email");
    const inputSubject = d.querySelector("#asunto");
    const message = d.querySelector("#mensaje");

    const email = {
        nombre: "",
        email: "",
        telefono:"",
        asunto: "",
        mensaje: ""
    }
    // console.log(email);
    // console.log(inputEmail);
    inputName.addEventListener("input", validar);
    inputEmail.addEventListener("input", validar);
    inputSubject.addEventListener("input", validar);
    inputTel.addEventListener("input", validar);
    message.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail);

    function validar(e){
        // console.log(e.target.value);
        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta(`El ${e.target.id} no es valido`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }

    function mostrarAlerta(value, referencia){
        limpiarAlerta(referencia);

        const alerta = referencia.querySelector(".bg-red");
        if(alerta){
            alerta.remove();
        }

        const error = d.createElement("p");
        error.classList.add("bg-red", "text-white", "p-2", "text-center");
        error.textContent = value;

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red");
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disable = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function enviarEmail(e){
        e.preventDefault();
        
        setTimeout(() => {
            resetFormulario();

            const alertaEnviado = d.createElement("p");
            alertaEnviado.classList.add("bg-green", "text-white","rounded", "text-center", "p-2", "font-bold", "uppercase");
            alertaEnviado.textContent = "Mensaje enviado correctamente";
            formulario.appendChild(alertaEnviado);

            setTimeout(() => {
                alertaEnviado.remove();
            }, 2000);
        }, 3000);
    }

    function resetFormulario(){
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        email.nombre = "";
        email.telefono = "";
        formulario.reset();
        comprobarEmail();
    }
});