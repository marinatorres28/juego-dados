// declarar la variable tipo array que guardara las puntuaciones
let puntuaciones = [0, 0];
let rondaActual = 1;
// el numero de rondas lo ponemos como constante porque va a ser 5 siempre
const numeroRondas = 5;
// creamos un array que guardará los resultados de cada jugador en cada ronda
let lanzamientoJugador1 = [];
let lanzamientoJugador2 = [];

//escuchar los eventos que el usuario pulse
// cuando la funcion es llamada desde un evento, no se le coloca ()
document.querySelector("#lanzar-j1").addEventListener("click", lanzarDadosJugador1);
document.querySelector("#lanzar-j2").addEventListener("click", lanzarDadosJugador2);

// creamos una funcion de mostrar la imagen dado
function crearImagenDado(valor) { //el valor será el random del 1 al 6
    //crea un elemento img
    let img = document.createElement("img");
    //le damos un valor a la imagen
    img.src = `img/${valor}.png`;
    img.alt = `Dado ${valor}`; //img.setAttribute("alt", `Dado${valor}`) <- otra forma
    return img; //devuelve el valor a quien lo llama (la funcion) 
}



function lanzarDadosJugador1() {
    //si la ronda actual es mayor que el numero de rondas, no hará más partidas porque se llega a 5
    if (rondaActual > numeroRondas) return;
    // generamos el valor del dado 1 del jugador 1
    let dado1 = Math.floor(Math.random() * 6) + 1; //.floor redondea la parte decimal (el +1 es para que no coja el 0)
    let dado2 = Math.floor(Math.random() * 6) + 1;
    // con push añadimos valores al array vacio que hemos creado antes, dandole los valores del dado 1 y dado 2
    lanzamientoJugador1.push([dado1, dado2]);
    
    // para deshabilitar el boton del jugador 1
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=false;

    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador1");

}

function lanzarDadosJugador2() {
    if (rondaActual > numeroRondas) return;
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;
    lanzamientoJugador2.push([dado1, dado2]);
    
    //  deshabilitar el boton 
    document.querySelector("#lanzar-j1").disabled=false;
    document.querySelector("#lanzar-j2").disabled=true;

    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador2");
    //cuando el jugador dos ha terminado de tirar se incrementa la ronda
    rondaActual++;
}


function actualizarRondaHTML(ronda, dado1, dado2, jugador) {
    let rondaDiv = document.querySelector(`#ronda-${ronda}`);
    if (!rondaDiv) {
        rondaDiv = document.createElement("div");
        // para añadir una clase al div desde js
        rondaDiv.classList.add("ronda");
        // rondaDiv.className=("ronda");
        rondaDiv.setAttribute("id", `ronda-${ronda}`);
        rondaDiv.innerHTML = `
        <h3>Ronda ${ronda}</h3>
        <div class="dados" id="dados-ronda-${ronda}">
           <div id="jugador1-ronda-${ronda}"></div>
           <div id="jugador2-ronda-${ronda}"></div>
        </div>`;

        document.querySelector("#rondas").appendChild(rondaDiv);
    }
    // buscar del html lo que hemos creado en el bloque anterior jugador-1-ronda-1
    let jugadorDiv = document.querySelector(`#${jugador}-ronda-${ronda}`);
    jugadorDiv.innerHTML = "";
    // creamos los dados en el html con el valor que nos ha dado los dados
    jugadorDiv.appendChild(crearImagenDado(dado1));
    jugadorDiv.appendChild(crearImagenDado(dado2));

    let suma = dado1 + dado2;
    // operador ternario
    jugadorDiv.innerHTML += `<p>Jugador ${jugador === 'jugador1' ? 1 : 2} : ${suma}</p>`;

}


document.querySelector("#terminar").addEventListener("click", () => {
    // crear una salida para indicar el ganador
    for (let i = 0; i < numeroRondas; i++) {
        // suma total de todos los lanzamientos
        let sumaJugador1=lanzamientoJugador1[i] ? lanzamientoJugador1[i][0]+lanzamientoJugador1[i][1] : 0;
        let sumaJugador2=lanzamientoJugador2[i] ? lanzamientoJugador2[i][0]+lanzamientoJugador2[i][1] : 0;
        if (sumaJugador1>sumaJugador2){
            puntuaciones[0]++; // jugador 1 (esta en la posicion [0])
        }else if(sumaJugador2>sumaJugador1){
            puntuaciones[1]++; //jugador 2 (esta en la posicion [1])
        }
    }

    // determinar el ganador
    let ganador=determinarGanador();

    // salida
    let puntuacionesHTML=`
    <h3> Puntuaciones Acumuladas </h3>
    <p>Jugador 1 -> ${puntuaciones[0]}</p>
    <p>Jugador 2 -> ${puntuaciones[1]}</p>
    <h3> Ganador: ${ganador}</h3>
    `;

    // le damos salida en el html
    document.querySelector("#puntuaciones").innerHTML=puntuacionesHTML;

    // deshabilitar los botones para que no se sigan pulsando
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=true;
    document.querySelector("#terminar").disabled=true;
})


function determinarGanador(){
    if(puntuaciones[0]>puntuaciones[0]){
        return "Jugador 1";
    }else if(puntuaciones[1]>puntuaciones[0]){
        return "Jugador 2";
    }else{
        return "Empate";
    }
}

