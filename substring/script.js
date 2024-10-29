let frase = "La lluvia y laa tieerraa sonn importantes, llame a la reina. ";
let nuevaFrase = ""; // Nueva frase para almacenar el resultado

for (let i = 0; i < frase.length; i++) {
    // Comprobar si el carácter actual es igual al siguiente
    if (frase[i] === frase[i + 1]) {
        // Verificar si es parte de 'll'
        if (frase[i] === 'l' && frase[i + 1] === 'l') {
            nuevaFrase += 'll';  // Agregar 'll' sin cambios
            i++;  
        } 
        // Verificar si es parte de 'rr'
        else if (frase[i] === 'r' && frase[i + 1] === 'r') {
            nuevaFrase += 'rr';  // Agregar 'rr' sin cambios
            i++;  
        } 
        // Si no es "ll" ni "rr", se salta el carácter actual
    } else {
        nuevaFrase += frase[i];  // Agregar el carácter actual
    }
}

console.log(nuevaFrase);
