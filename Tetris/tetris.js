const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20; // Número de filas del tablero
const columnas = 10; // Número de columnas del tablero
const tamCelda = 30; // Tamaño de cada celda en píxeles

let tablero = []; // El tablero del juego
let piezaActual = null; // La pieza que se está moviendo
let posicionX = 3; // Posición inicial de la pieza en X
let posicionY = 0; // Posición inicial de la pieza en Y

// Definición de las piezas con sus formas y colores
const piezas = [
    { nombre: "C", forma: [[1, 1, 1], [1, 0, 1]], color: "red" },
    { nombre: "L", forma: [[1, 0, 0], [1, 1, 1]], color: "blue" },
    { nombre: "T", forma: [[0, 1, 0], [1, 1, 1]], color: "purple" },
    { nombre: "Z", forma: [[1, 1, 0], [0, 1, 1]], color: "green" },
    { nombre: "O", forma: [[1, 1], [1, 1]], color: "yellow" }
];

// Inicializa el tablero vacío con ceros
function inicializarTablero() {
    for (let i = 0; i < filas; i++) {
        tablero[i] = Array(columnas).fill(0); // Llenamos cada fila con ceros
    }
}

// Dibuja el tablero con las celdas
function dibujarTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const x = j * tamCelda;
            const y = i * tamCelda;
            lienzo.fillStyle = tablero[i][j] === 1 ? "gray" : "black"; // Color de las celdas
            lienzo.fillRect(x, y, tamCelda, tamCelda);
            lienzo.strokeStyle = "white"; // Borde blanco para cada celda
            lienzo.strokeRect(x, y, tamCelda, tamCelda);
        }
    }
}

// Dibuja la pieza en el tablero
function dibujarPieza(pieza, x, y) {
    lienzo.fillStyle = pieza.color; // Color de la pieza
    for (let fila = 0; fila < pieza.forma.length; fila++) {
        for (let columna = 0; columna < pieza.forma[fila].length; columna++) {
            if (pieza.forma[fila][columna] === 1) {
                const posX = (x + columna) * tamCelda;
                const posY = (y + fila) * tamCelda;
                lienzo.fillRect(posX, posY, tamCelda, tamCelda); // Dibujar el bloque
                lienzo.strokeStyle = "white"; // Borde blanco para la pieza
                lienzo.strokeRect(posX, posY, tamCelda, tamCelda);
            }
        }
    }
}

// Verifica si la pieza choca con otras o con los bordes
function chequearColisiones(pieza, x, y) {
    for (let fila = 0; fila < pieza.forma.length; fila++) {
        for (let columna = 0; columna < pieza.forma[fila].length; columna++) {
            if (pieza.forma[fila][columna] === 1) {
                const tableroX = x + columna;
                const tableroY = y + fila;
                // Verifica si está fuera de los límites o si hay una pieza en esa posición
                if (tableroX < 0 || tableroX >= columnas || tableroY >= filas || (tableroY >= 0 && tablero[tableroY][tableroX] === 1)) {
                    return true; // Si hay colisión
                }
            }
        }
    }
    return false; // No hay colisión
}

// Coloca la pieza en el tablero
function posicionaPieza(pieza, x, y) {
    for (let fila = 0; fila < pieza.forma.length; fila++) {
        for (let columna = 0; columna < pieza.forma[fila].length; columna++) {
            if (pieza.forma[fila][columna] === 1) {
                tablero[y + fila][x + columna] = 1; // Coloca el bloque en el tablero
            }
        }
    }
}

// Genera una pieza aleatoria
function generarPieza() {
    return piezas[Math.floor(Math.random() * piezas.length)];
}

// Elimina las líneas completas del tablero
function eliminarLinea() {
    for (let fila = 0; fila < filas; fila++) {
        if (tablero[fila].every(celda => celda === 1)) {
            tablero.splice(fila, 1); // Elimina la línea completa
            tablero.unshift(Array(columnas).fill(0)); // Añade una nueva fila vacía en la parte superior
        }
    }
}

// Actualiza el estado del juego
function actualizar() {
    // Si no hay pieza actual, generamos una nueva
    if (!piezaActual) {
        piezaActual = generarPieza();
        posicionX = 3;
        posicionY = 0;
    }

    // Si la pieza no choca, la dejamos bajar
    if (!chequearColisiones(piezaActual, posicionX, posicionY + 1)) {
        posicionY++; // Movemos la pieza hacia abajo
    } else {
        // Si choca, la colocamos en el tablero
        posicionaPieza(piezaActual, posicionX, posicionY);
        eliminarLinea(); // Eliminamos líneas completas
        piezaActual = generarPieza(); // Generamos una nueva pieza
        posicionX = 3;
        posicionY = 0;

        // Si la nueva pieza colisiona, es el fin del juego
        if (chequearColisiones(piezaActual, posicionX, posicionY)) {
            alert("FIN DE LA PARTIDA");
            inicializarTablero(); // Reinicia el tablero
            piezaActual = null; // No hay pieza actual
        }
    }
}

// Como extra, listener de A D y S
function moverPieza(e) {
    const tecla = e.key;
    if (tecla === "a" || tecla === "A") { // Mover izquierda
        if (!chequearColisiones(piezaActual, posicionX - 1, posicionY)) {
            posicionX--;
        }
    } else if (tecla === "d" || tecla === "D") { // Mover derecha
        if (!chequearColisiones(piezaActual, posicionX + 1, posicionY)) {
            posicionX++;
        }
    } else if (tecla === "s" || tecla === "S") { // Mover abajo
        if (!chequearColisiones(piezaActual, posicionX, posicionY + 1)) {
            posicionY++;
        }
    }
}

// Asegúrate de que el evento de teclas se escucha correctamente
window.addEventListener("keydown", moverPieza);

// Función principal que actualiza el juego continuamente
function jugar() {
    actualizar(); // Actualiza el juego
    lienzo.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    dibujarTablero(); // Dibuja el tablero
    if (piezaActual) {
        dibujarPieza(piezaActual, posicionX, posicionY); // Dibuja la pieza
    }
    setTimeout(jugar,500); // Usar requestAnimationFrame en lugar de setTimeout
}

// Inicial
inicializarTablero();
jugar();