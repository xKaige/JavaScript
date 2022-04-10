// --------------------- CLASE 8 --------------------------


// -------------------- CONSTANTES DOM ----------------------------//

// RECORDATORIO DE CAMBIAR A getElementByID

const cPersonaje = document.querySelector("#cpersonaje");
const cEnemigo = document.querySelector("#cEnemigo");
const combate = document.querySelector("#cmbSimulado");
const resCombate = document.querySelector("#resumeCombate");
const resultadoLocal = document.querySelector("#storage");
const resultadosCombates = document.querySelector("#resultadosCombates");
const borrarLocales = document.querySelector("#borrarLocal");
const imgHeroe = document.querySelector("#imgHeroe");
const imgEnemigo = document.querySelector("#imgEnemigo");
const img1 = document.querySelector("#img-1");
const divError = document.querySelector("#error");


// ------------ INPUTS ENEMIGO ------------- //

const inputsEnemigo = document.querySelectorAll(".inputsEnemigo"); // Control de todos los Inputs Enemigos
const dataEnemigo = document.querySelectorAll(".dataEnemigo") // Control de todos los divs invisibles Enemigos
const inputEnemigo = document.querySelector("#enemigo");
const inputVidaEnemigo = document.querySelector("#vidaEnemigo");
const inputAtkEnemigo = document.querySelector("#atkEnemigo");
const nombreEnemigo = document.querySelector("#nombre-enemigo");
const atkEnemigoEspada = document.querySelector("#atk-enemigo-espada");
const atkEnemigo = document.querySelector("#atk-enemigo");
const vidEnemigo = document.querySelector("#vida-enemigo");

// -------------- INPUTOS HEROE ---------------- //

const inputsPersonaje = document.querySelectorAll(".inputsPersonaje") // Control de todos los Inputs del Personaje
const dataPersonaje = document.querySelectorAll(".dataPersonaje") // Control de todos los divs invisibles del Personaje
const vidaPersonaje = document.querySelector("#vida-personaje-p");
const atkPersonaje = document.querySelector("#atk-personaje");
const nombrePersonaje = document.querySelector("#nombre-personaje");
// ------------- BARRAS DE VIDA ----------------//

const contVidaHeroe = document.querySelector("#contenedorVidaHeroe");
const contVidaEnemigo = document.querySelector("#contenedorVidaEnemigo");


// RECORDATORIO DE CAMBIAR A getElementByID


//------------------ CREACION DE PERSONAJE -----------------------//

class Personaje {
    constructor (nombre, vida, ataque, avatar){
        this.name = nombre;
        this.vidaMax = parseInt(vida);
        this.vida = parseInt(vida);
        this.atk = parseInt(ataque);
        this.avata = avatar;
    }
};

let nHeroe = new Personaje("", 0, 0);

cPersonaje.addEventListener("click", function(){
        if (validarDatos()){
            crearPersona();
            validacionAvatar();
            ocultarInputsPersonaje()
            divHeroeTrue()

            localStorage.setItem("heroe", JSON.stringify(nHeroe));
            alertCreacionPersonaje()
            cPersonaje.disabled = true;
        }else{
            Swal.fire({
                title: "Usa los datos correctos papu",
                icon: "error",
                iconColor: "red",
                width: "30%",
                background: "#C96CFF",
                color: "#ffff"
            })
        }       
});


function crearPersona (){
    const heroe = document.querySelector("#heroe");
    const vida = document.querySelector("#vida");
    const atk = document.querySelector("#atk");
    const avatar = validaAvatar();
    nHeroe = new Personaje(heroe.value, vida.value, atk.value, avatar)

};


// ----------------- CREACION DE ENEMIGO ------------------ //

class Enemigo {
    constructor (nombre, vida, ataque, avatar) {
        this.name = nombre;        
        this.vidaMax = parseInt(vida);
        this.vida = parseInt(vida);
        this.atk = parseInt(ataque)
        this.avata = avatar;
    }
};

let nEnemigo = new Enemigo("", 0, 0);

cEnemigo.addEventListener("click", function(){
    if (validarDatosEnemigo()){
        crearEnemigo()  
        validacionAvatarEnemigo()
        divEnemigoTrue()
        localStorage.setItem("enemigo", JSON.stringify(nEnemigo));
        alertCreacionPersonaje()
        ocultarInputs()

        cEnemigo.disabled = true;
    } else {
        Swal.fire({
            title: "Usa los datos correctos papu",
            icon: "error",
            iconColor: "red",
            width: "30%",
            background: "#C96CFF",
            color: "#ffff"
            
        })
    }
});

function crearEnemigo (){
    const enemigo = document.querySelector("#enemigo");
    const vidaEnemigo = document.querySelector("#vidaEnemigo");
    const atkEnemigo = document.querySelector("#atkEnemigo");
    const avatar = validaAvatar();
    nEnemigo = new Enemigo(enemigo.value, vidaEnemigo.value, atkEnemigo.value, avatar)
};

// --------------------- FUNCION DE VALIDACION ---------------------- //

function validarDatos(){
    const heroe = document.querySelector("#heroe");
    const vida = document.querySelector("#vida");
    const atk = document.querySelector("#atk");
    if (heroe.value == "" || vida.value == 0 || atk.value == 0){
        return false        
    }else if (!isNaN(heroe.value)){
        return false
        }else if (isNaN(vida.value)){
            return false
            }else if (isNaN(atk.value)){
                return false
                }else{
                    return true
                    } 
};

function validarDatosEnemigo(){
    const enemigo = document.querySelector("#enemigo");
    const vidaEnemigo = document.querySelector("#vidaEnemigo");
    const atkEnemigo = document.querySelector("#atkEnemigo");
    if (enemigo.value == "" || vidaEnemigo.value == 0 || atkEnemigo.value == 0){
        return false        
    }else if (!isNaN(enemigo.value)){
        return false
        }else if (isNaN(vidaEnemigo.value)){
            return false
            }else if (isNaN(atkEnemigo.value)){
                return false
                }else{
                    return true
                    } 
};


// ----------------------- ARRAY ----------------------------------//

let resultados = []

let vEnemiga = "El Jugador 2 obtuvo la victoria";
let vHeroe = "El Jugador 1 obtuvo la victoria";

 // ------------------- RECIBIR DAÑO HEROE------------------------- //

function recibirDañoHeroe (){
    restarVidaHeroe(nEnemigo.atk)
};

function restarVidaHeroe (valor){
    sumarVidaHeroe(-valor)
};

function sumarVidaHeroe (valor){
    nHeroe.vida += valor
    const divTotalPersonaje = document.querySelector("#totalPersonaje");
    if (nHeroe.vida <= 0){
        resCombate.disabled = true
        combate.disabled = true
        divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> ${nHeroe.name} la re quedó </p>`
        resultados.push(vEnemiga);
        localStorage.setItem("resultado", JSON.stringify(resultados))
        upDateLifeBarHeroe()
    }else {
        upDateLifeBarHeroe();
        vidaPersonaje.innerHTML = `<p class="textoEnemigo"><b>Hp</b>: ${nHeroe.vida} </p>`
    }
};

 // ------------------- RECIBIR DAÑO ENEMIGO------------------------- //

 function recibirDañoEnemigo (){
    restarVidaEnemigo(nHeroe.atk)
};

function restarVidaEnemigo (valor){
    sumarVidaEnemigo(-valor)
};

function sumarVidaEnemigo (valor){
    nEnemigo.vida += valor
    const divTotal = document.querySelector("#total");
    if (nEnemigo.vida <= 0){
        resCombate.disabled = true
        combate.disabled = true
        divTotal.innerHTML = `<p class="textoEnemigo mt-2"> ${nEnemigo.name} la re quedó </p>`
        resultados.push(vHeroe);
        localStorage.setItem("resultado", JSON.stringify(resultados))
        upDateLifeBarEnemy()
    }else {
        upDateLifeBarEnemy()
        vidEnemigo.innerHTML=`<p class="textoEnemigo"><b>Hp</b> ${nEnemigo.vida}</p>`
    }
};


// ---------------------------- FUNCIONES ----------------------------- //

function divHeroeTrue(){
    nombrePersonaje.innerHTML=`<p class="textoEnemigo"><b>Heroe</b>: ${nHeroe.name}`
    atkPersonaje.innerHTML=`<p class="textoEnemigo"><b>Atk</b>: ${nHeroe.atk}</p>`
    vidaPersonaje.innerHTML=`<p class="textoEnemigo"><b>Hp</b>: ${nHeroe.vida}</p>`
}


function divEnemigoTrue(){
    nombreEnemigo.innerHTML=`<p class="textoEnemigo"><b>Enemigo</b>: ${nEnemigo.name}</p>`
    atkEnemigo.innerHTML= `<p class="textoEnemigo"><b>Atk</b>: ${nEnemigo.atk} </p>`
    vidEnemigo.innerHTML=`<p class="textoEnemigo"><b>Hp</b> ${nEnemigo.vida}</p>`
}

function ocultarInputsPersonaje() {
    inputsPersonaje.forEach(element => {
        element.hidden=true
    });
    
    dataPersonaje.forEach(element => {
        element.hidden=false
    });
}


function ocultarInputs() {
    
    dataEnemigo.forEach(element => {
        element.hidden=false
    });

    inputsEnemigo.forEach(element => {
        element.hidden=true
    });
}


combate.addEventListener("click", function(){
    iniciarCombate();
    validacionImg();
    validacionImgEnemigo()
    combate.disabled = true;
});

let parImpar = () => { return ((Math.round(Math.random() * 9 + 1))%2 == 0)}

function iniciarCombate (){
    if (cEnemigo.disabled == true && cPersonaje.disabled == true){
        turnoRandom()
    }
};

resCombate.addEventListener("click", function(){
    combate.disabled = false;
});

function turnoRandom (){
    parImpar() ? recibirDañoEnemigo() : recibirDañoHeroe();
};



function upDateLifeBarHeroe(){
    let porcentajeVida = (nHeroe.vida*100)/nHeroe.vidaMax;
    let porcentajeAux = porcentajeVida <= 0 ? 0 : porcentajeVida
    contVidaHeroe.style.width=porcentajeAux+"%"
}

function upDateLifeBarEnemy(){
    let porcentajeVida = (nEnemigo.vida*100)/nEnemigo.vidaMax;
    let porcentajeAux = porcentajeVida <= 0 ? 0 : porcentajeVida
    contVidaEnemigo.style.width=porcentajeAux+"%"
}




// ------------------------- MOSTRAR STORAGE ---------------------// 

resultadoLocal.addEventListener("click", function(){
    validarLocales()
})

function validarLocales(){
    let resultadosLocales = JSON.parse(localStorage.getItem("resultado"));
    let innerHtml = !resultadosLocales ? `<p class="textoEnemigo">No se encontraron resultados</p>` : `<p class="textoEnemigo mt-2">${resultadosLocales}</p>`;
    resultadosCombates.innerHTML = innerHtml;
}

// -------------------------- BORRAR LOCAL STORAGE ---------------- //

borrarLocales.addEventListener("click", function(){
    borrarDatosLocales()
});

let borrarDatosLocales = () => {localStorage.clear()};

// ------------------------ VALIDACION GIF -------------------------- //

function validacionImg () {
    let porcentajeVida = (nHeroe.vida*100)/nHeroe.vidaMax;

    if (porcentajeVida <= 75 && porcentajeVida > 30){
        imgHeroe.src=`./img/Capy${nHeroe.avata}-50.gif`
    } else if (porcentajeVida <= 30 ){
        imgHeroe.src=`./img/Capy${nHeroe.avata}-30.gif`
    }
};

function validacionImgEnemigo(){
    let porcentajeVida = (nEnemigo.vida*100)/nEnemigo.vidaMax;

    if (porcentajeVida <=75 && porcentajeVida > 30){
        imgEnemigo.src=`./img/Capy${nEnemigo.avata}-50.gif`
    } else if (porcentajeVida <=30 ){
        imgEnemigo.src=`./img/Capy${nEnemigo.avata}-30.gif`
    };
}

// ----------------------- AVATAR RANDOM ------------------- //

let validaAvatar = () => { return (Math.round(Math.random()* 2))+1};

function validacionAvatar() {
    imgHeroe.src=`./img/Capy${nHeroe.avata}-100.gif`
};

function validacionAvatarEnemigo(){
    imgEnemigo.src=`./img/Capy${nEnemigo.avata}-100.gif`
}

function alertCreacionPersonaje(){
    Toastify({
        text: "Personaje Creado",
        className: "info",
        position: "right",
        duration: "1500",
        backgroundColor:"#b5179e",
        gravity: "top",
        offset:{
            x: 350
        },
        style: {
          background: "linear-gradient(to right, #E76F51, #E9C46A)",
        }
      }).showToast();
}

// ---------------------- PROMESAS API  -------------------------- //

/*

fetch("https://dog.ceo/api/breeds/image/random") // INVOCA A LA API
    .then((resp) => {                           // TRAE Y COMPRUEBA JSON DE LA API
        if (resp.status == 200){
            return resp.json()
        } else{
            divError.innerHTML = `<p>No se cargó bien la API</p>`
        }
    })
    .then((data)=>{ // INVOCAR CUERPO DEL MENSAJE
        if(data){
            img1.src= data.message
        }
    })
    .catch(() => { // ERROR DEL CUERPO
        divError.innerHTML = `<p>No se cargó bien la imagen</p>`
    });

*/