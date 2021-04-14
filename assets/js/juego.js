(() => {
    'use strict'
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'],
        divCartasJugadores = document.querySelectorAll('.divCartas');
    let deck = [],
        puntosHTML = document.querySelectorAll('small'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        puntosJugadores = [];

    const inicializarJuego = (numJugadores = 2) => {
        puntosJugadores = [];

        deck = []
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }


        puntosHTML.forEach(eleme => eleme.innerText = 0);

        divCartasJugadores.forEach(eleme => eleme.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;




    }


    const crearDeck = () => {
        deck = [];

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



        return _.shuffle(deck);
    }


    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {


        if (deck.length === 0) {
            throw 'No hay carytas en el deck'
        }

        return deck.pop();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 20
            : valor * 1;
    }
    // La posicion 1 de puntos jugadores es de la computadora 
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana ');

            } else if (puntosMinimos > 21) {
                alert('La computadora gana ');
            }
            else if (puntosComputadora > 21 || puntosMinimos === 21) {
                alert('Ganaste');
            }
            else {
                alert('La computadora gana2');
            }

        }, 20);

    }

    //turno de la computadora 
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }
            else if (puntosMinimos === 21) {
                break;
            }




        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        setTimeout(() => {
            determinarGanador();
        }, 20);


    }

    //eventos
    btnPedir.addEventListener('click', () => {


        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);

    })


    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();


    });

})();





