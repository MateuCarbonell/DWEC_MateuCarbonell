/*
Crear una función llamada mostrarVentana que se ejecute automáticamente al recargar la página.
La función debe abrir una nueva ventana emergente de tamaño reducido (300px de ancho y 200px de alto) 
centrada en la pantalla, que contenga un mensaje de bienvenida, por ejemplo, "Bienvenido a nuestra página".
La ventana emergente debe cerrarse automáticamente después de 3 segundos.
Mientras la ventana esté abierta, el botón "Atrás" del navegador en la ventana principal debe quedar
deshabilitado (simulado), y al cerrar la ventana emergente, debe reactivarse.
*/

function mostrarVentana(){
    let ancho = 300;
    let alto = 200;
    let centrarX = (window.screen.width - ancho) / 2;
    let centrarY = (window.screen.height - alto) / 2;

    let ventanaEmergente = window.open(
        '','Nueva Ventana',`width=${ancho},height=${alto},top=${centrarY},left=${centrarX}`
    );

    if(ventanaEmergente){
        ventanaEmergente.document.write("<h2>Bienvenido a nuestra página</h2>");
    };

    setTimeout(function(){
        if(ventanaEmergente){
            ventanaEmergente.close();
        }
    },3000);
    

}
window.onload = mostrarVentana;
