/*
Elabora una calculadora. El programa debe pedirle al usuario un número, depués un símbolo (+, -, *, / , **, %) 
y después otro número. El programa debe mostrar por consola el resultado de la operación. Añade un control de 
errores para comprobar los datos introducidos por el usuario.
*/

let n1= prompt("Numero 1: ");
let operador = prompt("Símbolo?: ");
let n2= prompt("Numero 2:");
n1 = parseFloat(n1);
n2 = parseFloat(n2);
let resultado;

function comprobarNumero(){
    if(isNaN(n1) || isNaN(n2)){
        console.log("Por favor, los dos valores introducidos han de ser numeros")
        return false;
    }
    return true;
}

if(comprobarNumero()){
    switch (operador) {
        case "+":
            resultado = n1 + n2;
            console.log(`La suma de ${n1} y ${n2} es: ${resultado}`);
            break;
        case "-":
            resultado = n1 - n2;
            console.log(`La resta de ${n1} y ${n2} es: ${resultado}`);
            break;
        case "*":
            resultado = n1 * n2;
            console.log(`La multiplicación entre ${n1} y ${n2} es: ${resultado}`);
            break;
        case "/":
            resultado = n1 / n2;
            console.log(`La división entre ${n1} y ${n2} es: ${resultado}`);
            break;
        case "**":
            resultado = Math.pow(n1,n2);
            console.log(`La potencia de ${n1} elevado a ${n2} es: ${resultado}`);
            break;
        case "%":
            resultado = n1 % n2;
            console.log(`El resto/residuo de ${n1} % ${n2} es: ${resultado}`);
            break;
        default:
            console.log("El símbolo que has introducido es incorrecto");
            break;
    }
}

