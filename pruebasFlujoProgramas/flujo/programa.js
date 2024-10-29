function login() {
    var usuario = prompt("Quién eres?", "Escribe tu nombre de usuario aquí");

    // Si el usuario presiona cancelar o deja el campo vacío
    if (usuario === null || usuario === "") {
        alert("Cancelado");
        return; 
    }

    switch (usuario) {
        case "Cancelar":
            alert("Cancelado");
            break;
        case "Administrador":
            var contraseña = prompt("Introduce la contraseña", "Escribe tu contraseña aquí");

            // Si el usuario presiona cancelar o deja la contraseña vacía
            if (contraseña === null || contraseña === "") {
                alert("Cancelado");
                return; 
            }

            switch (contraseña) {
                case "Cancelar":
                    alert("Cancelado");
                    break;
                case "ElMejor":
                    alert("¡Bienvenido!");
                    break;
                default:
                    alert("Contraseña incorrecta");
                    break;
            }
            break;
        default:
            alert("No te conozco");
            break;
    }
}

login();
