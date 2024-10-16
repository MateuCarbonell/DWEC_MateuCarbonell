/* Ya que en todos los ejercicios menos el 7 y el 8 van a pedir números, creo una función para poder reciclar código, y así me ahorro trabajo extra,
   además hacemos uso del do/while para que hasta que no se introduzca el valor correcto, siga pidiendolo.
*/

function pedirNumero(mensaje) {
    let valor;
    do {
        valor = parseFloat(prompt(mensaje));
    } while (isNaN(valor) || valor === "");
    return valor;
}


// Ej 1
function ejercicio1() {
    let horasTrabajadas = pedirNumero("¿Cuántas horas has trabajado?");
    let costeHoras = pedirNumero("¿Coste por hora?");
    let resultado = (horasTrabajadas * costeHoras).toFixed(2);
    document.getElementById("resultado").innerHTML = `Te corresponde ${resultado}€ `;
}

//Ej 2
function ejercicio2() {
    let peso = pedirNumero("KG?");
    let estatura = pedirNumero("Estatura?");
    let imc = (peso / (estatura * estatura)).toFixed(2);
    document.getElementById("resultado").innerHTML = `Tu índice de masa corporal es ${imc} (redondeado a 2 decimales).`;
}


// Ej 3
function ejercicio3() {
    let n = pedirNumero("Introduce el primer número entero (n):");
    let m = pedirNumero("Introduce el segundo número entero (m):");
    let cociente = Math.floor(n / m);  
    let resto = (n % m).toFixed(2);  
    document.getElementById("resultado").innerHTML = 
        `La división resultante de dividir ${n} entre ${m} da un cociente ${cociente} y un resto ${resto}.`;
}

// Ej 4

function ejercicio4() {
    let cantidad = pedirNumero("¿Cantidad a invertir?");
    let interes = pedirNumero("¿Interés anual (%)?");
    let años = pedirNumero("¿Número de años?");
    
    let capital = cantidad * Math.pow((1 + (interes / 100)), años);
    capital = capital.toFixed(2);
    
    document.getElementById("resultado").innerHTML = `El capital obtenido en la inversión es: ${capital} €.`;
}

// Ej 5
function ejercicio5() {
    const PESO_PAYASO = 112;
    const PESO_MUÑECA = 75;
    
    let payasos = pedirNumero("¿Cuántos payasos?");
    let muñecas = pedirNumero("¿Cuántas muñecas?");
    
    let total = payasos + muñecas;
    let pesoTotal = (PESO_PAYASO * payasos) + (PESO_MUÑECA * muñecas);
    let conversionKg = pesoTotal / 1000;
    
    document.getElementById("resultado").innerHTML = 
        `Se han pedido ${payasos} payasos y ${muñecas} muñecas, en total da ${total}. El peso total del paquete es ${pesoTotal} gramos o ${conversionKg} kg.`;
}

// Ej 6
function ejercicio6() {
    const DESCUENTO = 0.60;
    const PRECIO_PAN = 3.49;
    const PRECIO_PAN_DESCUENTO = PRECIO_PAN * (1 - DESCUENTO);
    
    let panAntiguo = pedirNumero("¿Cuántas barras de pan se han vendido, que no son de hoy?");
    let totalBarrasVendidas = pedirNumero("¿Total de barras vendidas?");
    
    let panDeHoy = totalBarrasVendidas - panAntiguo;
    let totalVendido = (panAntiguo * PRECIO_PAN_DESCUENTO) + (panDeHoy * PRECIO_PAN);
    let totalVendidoTodoPanDeHoy = totalBarrasVendidas * PRECIO_PAN;
    
    document.getElementById("resultado").innerHTML = `
        Se han vendido un total de ${totalBarrasVendidas} barras.<br>
        De las cuales ${panAntiguo} no son del día.<br>
        El total ganado con el pan vendido es: ${totalVendido.toFixed(2)}€.<br>
        Si todo el pan hubiera sido del día, se habría ganado: ${totalVendidoTodoPanDeHoy.toFixed(2)}€.
    `;
}

// Ej 7
function ejercicio7(){
    const preguntas = [
        "¿Messi es el mejor jugador del mundo?",
        "¿Los cocodrilos vuelan?",
        "¿TypeScript es no tipado?"
    ]

    const respuestasCorrectas = [
        "si",
        "no",
        "no",
    ]

    let haGanado = true;

    for(let i= 0 ; i<preguntas.length;i++){
        let respuestaUsuario = prompt(preguntas[i].toLowerCase());
        if(respuestaUsuario !== respuestasCorrectas[i]){
            haGanado = false;
            break;
        }
    }

    if (haGanado) {
        document.getElementById("resultado").innerHTML = "Felicidades! Has respondido correctamente a todas las preguntas.";
    } else {
        document.getElementById("resultado").innerHTML = "Lo siento, has perdido el juego.";
    }
}

// Ej 8
function ejercicio8() {
    const usuario = "Mateu";
    const contraseña = "Carbonell";

    let valor1 = prompt("Usuario:");
    let valor2 = prompt("Contraseña:");

    if (usuario === valor1 && contraseña === valor2) {
        document.getElementById("resultado").innerHTML = "Autenticación exitosa";
    } else {
        document.getElementById("resultado").innerHTML = "Usuario o contraseña equivocados";
    }
}

// Ej 9
function ejercicio9() {
    const cosas = [
        "el chocolate",
        "el cine",
        "la música",
        "los deportes",
        "viajar",
        "el kebab",
        "leer libros",
        "los videojuegos",
    ];

    let cosaSeleccionada = cosas[Math.floor(Math.random() * cosas.length)];

    let valor = pedirNumero(`Evalúa del 1 al 10 cuánto te gusta ${cosaSeleccionada}:`);

    while (valor < 1 || valor > 10) {
        valor = pedirNumero(`Por favor, evalúa entre 1 y 10 cuánto te gusta ${cosaSeleccionada}:`);
    }

    document.getElementById("resultado").innerHTML = `Has evaluado "${cosaSeleccionada}" con un ${valor}/10.`;
}


// Ej 10
function ejercicio10() {
    let nota = pedirNumero("Nota del examen:");
    let mensaje;
    
    if (nota === 10) {
        mensaje = "¡Excelente!";
    } else if (nota >= 8 && nota <= 9) {
        mensaje = "¡Muy bien!";
    } else if (nota >= 6 && nota <= 7) {
        mensaje = "Aprobado.";
    } else {
        mensaje = "Reprobado.";
    }
    
    document.getElementById("resultado").innerHTML = mensaje;
}
