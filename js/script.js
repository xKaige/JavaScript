// --------------------- CLASE 5 --------------------------


// -------------------- CONSTANTES DOM ----------------------------//

// RECORDATORIO DE CAMBIAR A getElementByID

const cPersonaje = document.querySelector("#cpersonaje");
const cEnemigo = document.querySelector("#cEnemigo");
const combate = document.querySelector("#cmbSimulado");
const resCombate = document.querySelector("#resumeCombate");
const resultadoLocal = document.querySelector("#storage");
const resultadosCombates = document.querySelector("#resultadosCombates");
const borrarLocales = document.querySelector("#borrarLocal");
const imgHeroe = document.querySelector("#imgHeroe")

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
            const divTotalPersonaje = document.querySelector("#totalPersonaje");
            divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> <b>Heroe</b>: ${nHeroe.name} <b>Hp</b>: ${nHeroe.vida} <b>Atk</b>: ${nHeroe.atk} </p>`
            localStorage.setItem("heroe", JSON.stringify(nHeroe));
            Toastify({
                text: "Personaje Creado",
                className: "info",
                position: "rigth",
                gravity: "bottom",
                style: {
                  background: "linear-gradient(to right, #E76F51, #E9C46A)",
                }
              }).showToast();
            cPersonaje.disabled = true;
        }else{
            Swal.fire({
                title: "Usa los datos correctos papu",
                icon: "error"
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
    constructor (nombre, vida, ataque) {
        this.name = nombre;
        this.vida = parseInt(vida);
        this.atk = parseInt(ataque)
    }
};

let nEnemigo = new Enemigo("", 0, 0);


cEnemigo.addEventListener("click", function(){
    if (validarDatosEnemigo()){
        crearEnemigo()  
        Toastify({
            text: "Personaje Creado",
            className: "info",
            position: "rigth",
            gravity: "bottom",
            style: {
              background: "linear-gradient(to right, #E76F51, #E9C46A)",
            }
          }).showToast();      
        const divTotal = document.querySelector("#total");
        divTotal.innerHTML = `<p class="textoEnemigo mt-2"> <b>Enemigo</b>: ${nEnemigo.name} <b>Hp</b>: ${nEnemigo.vida} <b>Atk</b>: ${nEnemigo.atk} </p>`;
        localStorage.setItem("enemigo", JSON.stringify(nEnemigo));
        cEnemigo.disabled = true;
        
    } else {
        Swal.fire({
            title: "Usa los datos correctos papu",
            icon: "error"
        })
    }
});

function crearEnemigo (){
    const enemigo = document.querySelector("#enemigo");
    const vidaEnemigo = document.querySelector("#vidaEnemigo");
    const atkEnemigo = document.querySelector("#atkEnemigo");
    nEnemigo = new Enemigo(enemigo.value, vidaEnemigo.value, atkEnemigo.value)
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

let vEnemiga = "El enemigo obtuvo la victoria";
let vHeroe = "El heroe obtuvo la victoria";

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
        divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> ${nHeroe.name} la re quedó </p>`
        resultados.push(vEnemiga);
        localStorage.setItem("resultado", JSON.stringify(resultados))
    }else {
        divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> <b>Heroe</b>: ${nHeroe.name} <b>Hp</b>: ${nHeroe.vida} <b>Atk</b>: ${nHeroe.atk} </p>`
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
        divTotal.innerHTML = `<p class="textoEnemigo mt-2"> ${nEnemigo.name} la re quedó </p>`
        resultados.push(vHeroe);
        localStorage.setItem("resultado", JSON.stringify(resultados))
    }else {
        divTotal.innerHTML = `<p class="textoEnemigo mt-2"> <b>Heroe</b>: ${nEnemigo.name} <b>Hp</b>: ${nEnemigo.vida} <b>Atk</b>: ${nEnemigo.atk} </p>`
    }
};


// ---------------- FUNCIONES DE COMBATE ----------------------------- //

combate.addEventListener("click", function(){
    iniciarCombate();
    validacionImg();
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

// ----------------------- AVATAR RANDOM ------------------- //

let validaAvatar = () => { return (Math.round(Math.random()* 2))+1};

function validacionAvatar() {
        imgHeroe.src=`./img/Capy${nHeroe.avata}-100.gif`
};