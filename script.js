// --------------------- CLASE 5 --------------------------

// CONSTANTES DOM

const cPersonaje = document.querySelector("#cpersonaje");
const cEnemigo = document.querySelector("#cEnemigo");

// CREACION DE PERSONAJE

class Personaje {
    constructor (nombre, vida, ataque){
        this.name = nombre;
        this.vida = parseInt(vida);
        this.atk = parseInt(ataque);
    }
};

let nHeroe = new Personaje("", 0, 0);

cPersonaje.addEventListener("click", function(){
        if (validarDatos()){
            crearPersona();
            const divTotalPersonaje = document.querySelector("#totalPersonaje");
            divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> <b>Heroe</b>: ${nHeroe.name} <b>Hp</b>: ${nHeroe.vida} <b>Atk</b>: ${nHeroe.atk} </p>`
            cPersonaje.disabled = true;
        }else{
            alert("Completa bien los campos maquinola")
        }       
});

function crearPersona (){
    const heroe = document.querySelector("#heroe");
    const vida = document.querySelector("#vida");
    const atk = document.querySelector("#atk");
    nHeroe = new Personaje(heroe.value, vida.value, atk.value)

};


// CREACION DE ENEMIGO 

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
        const divTotal = document.querySelector("#total");
        divTotal.innerHTML = `<p class="textoEnemigo mt-2"> <b>Enemigo</b>: ${nEnemigo.name} <b>Hp</b>: ${nEnemigo.vida} <b>Atk</b>: ${nEnemigo.atk} </p>`;
        cEnemigo.disabled = true;
    } else {
        alert("Completa bien los campos papu")
    }
});

function crearEnemigo (){
    const enemigo = document.querySelector("#enemigo");
    const vidaEnemigo = document.querySelector("#vidaEnemigo");
    const atkEnemigo = document.querySelector("#atkEnemigo");
    nEnemigo = new Enemigo(enemigo.value, vidaEnemigo.value, atkEnemigo.value)
};

// FUNCION DE VALIDADCION //


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
}



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
}

 // FUNCION DAÑO

function restarVidaHeroe (valor){
    sumarVidaHeroe(-valor)
}

function sumarVidaHeroe (valor){
    nHeroe.vida += valor
    const divTotalPersonaje = document.querySelector("#totalPersonaje");
    if (nHeroe.vida <= 0){
        divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> ${nHeroe.name} la re quedó </p>`
    }else {
        divTotalPersonaje.innerHTML = `<p class="textoEnemigo mt-2"> <b>Heroe</b>: ${nHeroe.name} <b>Hp</b>: ${nHeroe.vida} <b>Atk</b>: ${nHeroe.atk} </p>`
    }
}

function recibirDañoHeroe (){
    restarVidaHeroe(nEnemigo.atk)
};

// INICIAR

function inicioNuevo (){


    // variables
    let itemInicial = [" Espada", " Pocion", " Antidoto"];

    alert("Bienvenidos, este es un pequeño espacio donde vamos darle vida a una aventura!");
    alert("Tienes un inventario que revisar!")
    alert(`${itemInicial}`)


    alert(`${nEnemigo.name} acaba de soltar un item!:\n 1-Escama\n 2-Corazon\n 3-Gema`)
    alert(`${nHeroe.name}, suerte con tu drop!`)


    function drop (){
        let numero = Math.random() * (100 - 1) + 1;
        
        if (numero >=51){
            itemInicial.push(" Escama")
            alert("Conseguiste Escama!")
        } else if (numero >=21 || numero <=49){
                itemInicial.push(" Corazon")
                alert("Conseguiste Corazon!")
                }else if (numero >=1 || numero <=19){
                    itemInicial.push(" Gema")
                    alert("Conseguiste la gema papu!!!")
                        } else {
            alert("Mejor suerte la proxima");
        }
    };

    drop()
   



    // ---------------- FIN DE FUNCIONES --------------- //

    let usoItem = prompt("Desea curarse?\n 1-Si\n 2-No");
    switch (usoItem) {
        case "1":
            pota()
            alert(`${nHeroe.name} ahora tienes ${nHeroe.vida} de HP`)
            break;
        case "2":
            alert("No pasa naranja!");
        default:
            break;
    }

    alert("Ahora procedemos a revisar el inventario")

    let organizar = prompt("Queres reorganizarlo?\n 1-Si\n 2-No");

    switch (organizar) {
        case "1":
            itemInicial.sort();
            alert(`Tu nuevo inventario: ${itemInicial}`)
            break;
        case "2":
            alert("Siempre tendras tiempo de reorganizarlo!")
            alert("Aqui finaliza la demo");
        default:
            console.log("Fin de demo - registrado");
            alert("Aqui finaliza la demo");
            break;
    };


}







/*
    //---------------------- CODIGO A DESGLOSAR PARA INCORPORAR!! ---------------------- //

    // Introduccion

    alert("Empecemos...");
    alert("Vamos a crear a nuestro Heroe");


    alert(`...`)
    alert("Algo salió mal!")
    alert(`${NEnemigo.name} no responde al llamado`)
    alert(`...`)
    alert(`${NEnemigo.name}: Llegó tu hora ${NPersonaje.name}!!`)
    alert(`**Enemigo ${NEnemigo.name} ataca**`)

    // secuencia switch inicial

    let accion = prompt("Seleccione (número) de accion que desea realizar\n 1) Ataque\n 2) Escapar");

    switch (accion) {
        case "1": 
                do {
                    batalla()
                }while(NEnemigo.vida >=1 && NPersonaje.vida >=1)
            
            alert(`${NEnemigo.name} acaba de soltar un item!:\n 1-Escama\n 2-Corazon\n 3-Gema`)
            alert(`${NPersonaje.name}, suerte con tu drop!`)
            drop()
            break;
        case "2":
            alert("Escapaste de la pelea")
        default:
            break;
    };


    // ---------------- FUNCIONES --------------- //

    */





    /*


    // funcion ataque heroe




    // funcion ataque enemigo

    function atacarEnemigo (){
        if (NPersonaje.vida >=0 ){
            NPersonaje.vida -= NEnemigo.atk
            console.log("Tienes " + NPersonaje.vida + " de vida");
            alert(`${NEnemigo.name} te atacó por ${NEnemigo.atk} de daño`)
            alert("Tienes " + NPersonaje.vida + " de vida")
        } else if (NPersonaje.vida <= 1) {
            NPersonaje.vida === 0
            console.log("Fin del juego")
            alert("Fin del juego")
                }else {
                alert("F")
            }
    };

    // funcion combate

    function batalla(){
        atacar()
        atacarEnemigo()
    };

*/
