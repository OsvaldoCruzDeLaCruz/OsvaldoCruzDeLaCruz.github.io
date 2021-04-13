

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']
let btnPedir = document.querySelector('#btnPedir');
let puntosJugador = 0, puntosComputadora = 0;
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
let puntosHTML = document.querySelectorAll('small');
let btnDetener = document.querySelector('#btnDetener');
let btnNuevo = document.querySelector('#btnNuevo');

const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);

        }

    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    // console.log(deck);

    deck = _.shuffle(deck);

    return deck;
}

const pedirCarta = () => {


    if (deck.length === 0) {
        throw 'No hay carytas en el deck'
    }

    let borrarCartaObtenida = deck.pop();

    return borrarCartaObtenida;
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 20
        : valor * 1;
}

//turno de la computadora 
const turnoComputadora = (puntosMinimos) => {

    while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')

    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
        // break;
    }
    else if (puntosMinimos === 21) {
        break;
    }





    setTimeout(() => {

        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana ');

        } else if (puntosMinimos > 21) {
            alert('La computadora gana ');
        }
        else if (puntosComputadora > 21) {
            alert('Ganaste');
        }
        else {
            alert('La computadora gana');
        }

    }, 50);



}





//eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        // alert('Perdiste :(');
        console.warn('Perdiste');
        turnoComputadora(puntosJugador);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, ganaste');
        turnoComputadora(puntosJugador);
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }

})




btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

})


btnNuevo.addEventListener('click',() =>{
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    console.log(deck);
    
});







