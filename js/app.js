const d = document;

d.addEventListener("DOMContentLoaded", ()=>{
    const formulario = d.querySelector("#formulario");
    const btnSubmit = d.querySelector("#formulario button[type='submit']");
    const inputName = d.querySelector("#nombre");
    const inputEmail = d.querySelector("#email");
    const inputSubject = d.querySelector("#asunto");
    const message = d.querySelector("#mensaje");

    const email = {
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    }

    // console.log(inputEmail);
    inputName.addEventListener("blur", validar);
    inputEmail.addEventListener("blur", validar);
    inputSubject.addEventListener("blur", validar);
    message.addEventListener("blur", validar);

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

        // comprobarEmail();
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
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }
});