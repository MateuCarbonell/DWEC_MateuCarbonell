const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20;
const columnas = 10;
const tamCelda = 30; // px x celda

// Crear el tablero vacío con 0 en todas las celdas
let tablero = [];

for (let i = 0; i < filas; i++) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
        fila.push(0); // 0 representa una celda vacía
    }
    tablero.push(fila); // Añadir la fila al tablero
    
}
tablero

console.log(tablero); // borrar

const pieza1 = {nombre: "C", forma:[[1,1,1],[1,0,1]], probabilidad: 0.2, color: "red"};
const pieza2 = {nombre: "L", forma:[[1,0,0],[1,1,1]], probabilidad: 0.2, color: "blue"};
const pieza3 = {nombre: "T", forma:[[0,1,0],[1,1,1]], probabilidad: 0.2, color: "purple"};
const pieza4 = {nombre: "Z", forma:[[1,1,0],[0,1,1]], probabilidad: 0.2, color: "green"};
const pieza5 = {nombre: "O", forma:[[1,1],[1,1]], probabilidad: 0.2, color: "yellow"};

const piezas = [];

piezas.push(pieza1,pieza2,pieza3,pieza4,pieza5);

console.log(piezas); // borrar
tablero[1][2] = 1;
function dibujarTablero() {
    if (canvas.getContext) {

      for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
          const x = columna * tamCelda; // Posición x de la celda
          const y = fila * tamCelda;   // Posición y de la celda
          if (tablero[fila][columna] === 1) {
            lienzo.fillStyle = "gray"; // Color gris para celdas ocupadas
          } else {
            lienzo.fillStyle = "black"; // Color negro para celdas vacías
          }

          // Dibujar la celda
          lienzo.fillRect(x, y, tamCelda, tamCelda);

          // Dibujar el contorno de la celda
          lienzo.strokeStyle="white";
          lienzo.strokeRect(x, y, tamCelda, tamCelda);
        }
      }
    }
    
}
// : le pasamos el objeto pieza y la posición donde tiene que dibujarla en el eje x  y en el eje y de nuestro lienzo.

function dibujarPieza(pieza, filas, columnas){
    for(let fila=0;fila<filas;fila++){
      for(let columna = 0; columna < columnas; columna++){
        tablero[fila][columna] = pieza;

        
      }
    }
}
