const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20; // Número de filas del tablero
const columnas = 10; // Número de columnas del tablero
const tamCelda = 30; // Tamaño de cada celda en píxeles

// Variables de juego
let tablero = [];
let piezaActual = null;
let posX = 3; // Posición inicial en X
let posY = 0; // Posición inicial en Y
let puntuacion = 0;

// Control del tiempo
let tiempoPrevio = 0;
let intervaloCaida = 500; // Milisegundos entre caídas
let acumuladorTiempo = 0;

// Definición de piezas
const piezas = [
    { nombre: "C", forma: [[1, 1, 1], [1, 0, 1]], color: "red" },
    { nombre: "L", forma: [[1, 0, 0], [1, 1, 1]], color: "blue" },
    { nombre: "T", forma: [[0, 1, 0], [1, 1, 1]], color: "purple" },
    { nombre: "Z", forma: [[1, 1, 0], [0, 1, 1]], color: "green" },
    { nombre: "O", forma: [[1, 1], [1, 1]], color: "yellow" }
];

// Inicializar tablero vacío
function inicializarTablero() {
    tablero = Array.from({ length: filas }, () => Array(columnas).fill(0));
}

// Dibujar el tablero
function dibujarTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const x = j * tamCelda;
            const y = i * tamCelda;
            lienzo.fillStyle = tablero[i][j] === 1 ? "gray" : "black";
            lienzo.fillRect(x, y, tamCelda, tamCelda);
            lienzo.strokeStyle = "white";
            lienzo.strokeRect(x, y, tamCelda, tamCelda);
        }
    }
}

// Dibujar una pieza
function dibujarPieza(pieza, x, y) {
    lienzo.fillStyle = pieza.color;
    pieza.forma.forEach((fila, i) => {
        fila.forEach((valor, j) => {
            if (valor === 1) {
                const posX = (x + j) * tamCelda;
                const posY = (y + i) * tamCelda;
                lienzo.fillRect(posX, posY, tamCelda, tamCelda);
                lienzo.strokeStyle = "white";
                lienzo.strokeRect(posX, posY, tamCelda, tamCelda);
            }
        });
    });
}

// Generar una pieza aleatoria
function generarPieza() {
    return piezas[Math.floor(Math.random() * piezas.length)];
}

// Verificar colisión
function verificarColision(pieza, x, y) {
    return pieza.forma.some((fila, i) =>
        fila.some((valor, j) => {
            if (valor === 1) {
                const tableroX = x + j;
                const tableroY = y + i;
                return (
                    tableroX < 0 ||
                    tableroX >= columnas ||
                    tableroY >= filas ||
                    (tableroY >= 0 && tablero[tableroY][tableroX] === 1)
                );
            }
            return false;
        })
    );
}

// Fijar pieza al tablero
function fijarPieza(pieza, x, y) {
    pieza.forma.forEach((fila, i) => {
        fila.forEach((valor, j) => {
            if (valor === 1) {
                tablero[y + i][x + j] = 1;
            }
        });
    });
}

// Limpiar líneas completas
function eliminarLinea() {
    for (let fila = 0; fila < filas; fila++) {
        if (tablero[fila].every(celda => celda === 1)) {
            tablero.splice(fila, 1); // Elimina la línea completa
            tablero.unshift(Array(columnas).fill(0)); // Añade una nueva fila vacía en la parte superior
        }
    }
}

// Mover pieza hacia abajo
function moverPiezaAbajo() {
    if (!verificarColision(piezaActual, posX, posY + 1)) {
        posY++;
    } else {
        fijarPieza(piezaActual, posX, posY);
        eliminarLinea();
        piezaActual = generarPieza();
        posX = 3;
        posY = 0;

        if (verificarColision(piezaActual, posX, posY)) {
            alert("Juego terminado. Puntuación: " + puntuacion);
            inicializarTablero();
            puntuacion = 0;
        }
    }
}

// Manejar movimiento lateral
function moverPieza(e) {
    const { key } = e;
    if (key === "ArrowLeft" && !verificarColision(piezaActual, posX - 1, posY)) {
        posX--;
    } else if (key === "ArrowRight" && !verificarColision(piezaActual, posX + 1, posY)) {
        posX++;
    } else if (key === "ArrowDown") {
        moverPiezaAbajo();
    }
}

window.addEventListener("keydown", moverPieza);

// Dibujar y actualizar el estado del juego
function renderizarJuego() {
    lienzo.clearRect(0, 0, canvas.width, canvas.height);
    dibujarTablero();
    dibujarPieza(piezaActual, posX, posY);
}

// Actualizar estado del juego
function actualizarJuego(tiempoActual) {
    const deltaTiempo = tiempoActual - tiempoPrevio;
    acumuladorTiempo += deltaTiempo;

    if (acumuladorTiempo > intervaloCaida) {
        moverPiezaAbajo();
        acumuladorTiempo = 0;
    }

    renderizarJuego();
    tiempoPrevio = tiempoActual;
    requestAnimationFrame(actualizarJuego);
}

// Inicializar y empezar el juego
inicializarTablero();
piezaActual = generarPieza();
requestAnimationFrame(actualizarJuego);
