/*
Crear una función llamada temporizadorAlerta que tome un número entero segundos como argumento.
La función debe mostrar una alerta con el mensaje "Tiempo completado" después de los segundos especificados.
Mientras el temporizador esté corriendo, el título de la página (usando document.title) debe actualizarse cada 
segundo con el tiempo restante en formato Restan: X segundos. Al completarse el temporizador, restablecer el título original de la página.
*/

function temporizadorAlerta(segundos){
    let tiempo = segundos;

    var intervalo = setInterval(function(){
        document.title = `Quedan ${tiempo} segundos`;
        tiempo--;

        if(tiempo <0){
            clearInterval(intervalo);
            alert("Tiempo completado")
        }
    },1000);


}

temporizadorAlerta(10);

