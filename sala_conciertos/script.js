// date

// Función para programar recordatorio
function programarRecordatorio(fechaConcierto, diasAntes) {
    const fecha = new Date(fechaConcierto);
    fecha.setDate(fecha.getDate() - diasAntes);
    return fecha.toISOString().split('T')[0];
}

// Función para determinar la temporada
function determinarTemporada(fechaConcierto) {
    const fecha = new Date(fechaConcierto);
    const mes = fecha.getMonth() + 1;
    if (mes >= 3 && mes <= 5) return "Primavera";
    if (mes >= 6 && mes <= 8) return "Verano";
    if (mes >= 9 && mes <= 11) return "Otoño";
    return "Invierno";
}

// Función para calcular días de antelación para venta de tickets
function calcularDiasAntelacion(fechaConcierto, fechaVenta) {
    const concierto = new Date(fechaConcierto);
    const venta = new Date(fechaVenta);
    const diferencia = Math.ceil((concierto - venta) / (1000 * 60 * 60 * 24));
    return diferencia;
}


// math 

// Función para calcular precio con descuento
// Lo valida pero se ha de mostrar algo por pantalla (por hacer)
function calcularPrecioDescuento(precioBase, descuento) {
    // Validar que el descuento esté entre 5 y 30
    if (descuento < 5 || descuento > 30) {
        return "El descuento debe estar entre 5% y 30%";
    }
    // Calcular el precio con el descuento
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

// String 

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

// // Función para validar y limpiar nombre del artista
// function validarNombreArtista(nombre) {
//     return nombre.trim().replace(/\s+/g, ' ');
// }


// Number

// Función para validar número de tickets disponibles
function validarTicketsDisponibles(ticketsIngresados, maxTickets) {
    return ticketsIngresados <= maxTickets;
}

// Función para calcular ingreso por asistente
function calcularIngresoPorAsistente(ingresoTotal, asistentes) {
    return asistentes ? (ingresoTotal / asistentes) : 0;
}

// Función para generar un ID único para el concierto
function generarIDConcierto(fechaConcierto, precioBase) {
    const fecha = new Date(fechaConcierto).getTime();
    return fecha.toString() + Math.round(precioBase * 100).toString();
}
