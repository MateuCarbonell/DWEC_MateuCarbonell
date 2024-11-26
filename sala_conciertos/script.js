// Función para programar recordatorio
function programarRecordatorio(fechaConcierto, diasAntes) {
    const fecha = new Date(fechaConcierto); // se convierte a objeto date
    fecha.setDate(fecha.getDate() - diasAntes); // saca los dias antes del concierto
    return fecha.toISOString().split('T')[0]; // separamos la fecha y la hora , y con [0] nos quedamos con la fecha solo.
    // devuelve la funcion en formato date
}

// Función para determinar la temporada
function determinarTemporada(fechaConcierto) {
    const fecha = new Date(fechaConcierto);
    const mes = fecha.getMonth() + 1; // 0 a 11 --> 1 - 12
    if (mes >= 3 && mes <= 5) return "Primavera";
    if (mes >= 6 && mes <= 8) return "Verano";
    if (mes >= 9 && mes <= 11) return "Otoño";
    return "Invierno";
}

// Función para calcular precio con descuento
function calcularPrecioDescuento(precioBase, descuento) {
    if (descuento < 5 || descuento > 30) {
        return alert("El descuento debe estar entre 5% y 30%");
    }
    return precioBase - (precioBase * (descuento / 100));
}

// Función para calcular ingresos esperados
function calcularIngresosEsperados(precioTicket, ticketsVendidos) {
    return precioTicket * ticketsVendidos;
}
// Función para dividir ingresos con el artista
function calcularDivisionIngresos(ingresoTotal, porcentajeArtista) {
    return ingresoTotal * (porcentajeArtista / 100);
}

// Función para formatear el nombre del concierto
function formatearNombreConcierto(nombre) {
    var palabras = nombre.split(" ");
    for (var i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1).toLowerCase();
    }
    return palabras.join(" ");
}

// Función para crear descripción del evento
function crearDescripcionEvento(nombreConcierto, nombreArtista, fecha) {
    return `Concierto de ${nombreConcierto} con ${nombreArtista} el ${new Date(fecha).toLocaleDateString()}`;
}

// Función para validar el nombre del artista
function validarNombreArtista(nombre) {
    nombre = nombre.trim(); // Elimina espacios en blanco al principio y al final
    const palabras = nombre.split(' ');
    let nombreLimpio = '';
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i] !== '') {
            if (nombreLimpio !== '') {
                nombreLimpio += ' ';
            }
            nombreLimpio += palabras[i];
        }
    }
    return nombreLimpio;
}
// Función para validar número de tickets disponibles
function validarTicketsDisponibles(ticketsIngresados, maxTickets) {
    return ticketsIngresados <= maxTickets;
}
// Función para calcular ingreso por asistente
function calcularIngresoPorAsistente(ingresoTotal, asistentes) {
    let promedioXAsistente= ingresoTotal/asistentes;
    promedioXAsistente = promedioXAsistente.toFixed(2);
    return promedioXAsistente;
}

// Función para generar un ID único para el concierto
function generarIDConcierto(fechaConcierto, precioBase) {
    const fecha = "ID"+fechaConcierto+precioBase;
    return fecha;
}



function crearCartaConcierto() {
    // Obtener valores del formulario
    const nombreConcierto = document.getElementById('nombreConcierto').value;
    const nombreArtista = document.getElementById('nombreArtista').value;
    const fechaConcierto = document.getElementById('fechaConcierto').value;
    const diasAntes = parseInt(document.getElementById('diasAntes').value);
    const precioBase = parseFloat(document.getElementById('precioBase').value);
    const descuento = parseFloat(document.getElementById('descuento').value);
    const ticketsVendidos = parseInt(document.getElementById('ticketsVendidos').value);

    // Definir constantes
    const PORCENTAJE_ARTISTA = 30;
    const TICKETS_POR_SALA = 1200;

    // Validar el número de tickets vendidos
    if (!validarTicketsDisponibles(ticketsVendidos, TICKETS_POR_SALA)) {
        alert(`No puedes vender más de ${TICKETS_POR_SALA} entradas.`);
        return; // Detiene la ejecución si el número de tickets excede el límite
    }

    
    // Validar y limpiar nombre del artista
    const nombreArtistaValidado = validarNombreArtista(nombreArtista);
    
    // Calcular fechas y valores
    const fechaRecordatorio = programarRecordatorio(fechaConcierto, diasAntes);
    const temporada = determinarTemporada(fechaConcierto);
    const precioConDescuento = calcularPrecioDescuento(precioBase, descuento);
    const idConcierto = generarIDConcierto(fechaConcierto, precioBase);
    const descripcionEvento = crearDescripcionEvento(nombreConcierto, nombreArtistaValidado, fechaConcierto);
    const ingresosEsperados = calcularIngresosEsperados(precioConDescuento, ticketsVendidos); 
    const parteDelArtista = calcularDivisionIngresos(ingresosEsperados, PORCENTAJE_ARTISTA); 
    const ingresoxAsistente = calcularIngresoPorAsistente(ingresosEsperados,ticketsVendidos);
    const ingresoLocal = ingresosEsperados - parteDelArtista; 


    // Crear carta del concierto
    const cartasConciertos = document.getElementById('cartasConciertos');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${formatearNombreConcierto(nombreConcierto)}</h3>
        <p>Artista: ${nombreArtistaValidado}</p>
        <p>Fecha: ${new Date(fechaConcierto).toLocaleDateString()}</p>
        <p>Recordatorio: ${fechaRecordatorio}</p>
        <p>Temporada: ${temporada}</p>
        <p>Precio original: $${precioBase.toFixed(2)}€</p>
        <p>Precio con descuento: $${precioConDescuento.toFixed(2)}€</p>
        <p>ID del Concierto: ${idConcierto}</p>
        <p>Ingreso por asistente: ${ingresoxAsistente}€</p>
        <p>Ingreso para artista: ${parteDelArtista}€</p>
        <p>Ingreso para el local: ${ingresoLocal}€</p>
        <p>${descripcionEvento}</p>

    `;
    cartasConciertos.appendChild(card);

    // Limpiar formulario
    document.getElementById('formConcierto').reset();
}
