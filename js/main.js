// Lista de ejemplo de jugadores (array de objetos)
import listOfPlayersExample from './samplePlayers.js';

// Módulo con clase constructora de nuevo jugador (objeto)
import { Player } from './player.js';

// Función para renderizar jugadores
import { clearForm, renderPlayer, updatePlayerCount, renderEditedPlayer, renderDeletedPlayer } from './dom.js';

let listOfPlayers = JSON.parse(localStorage.getItem("listOfPlayers")) || listOfPlayersExample;

let playerEdited

const editButtonHandler = (id, listOfPlayers) => {

    // Suprimir botón de agregar y mostrar botón de editar
    document.getElementById("addPlayerSubmit").style.display = "none";
    document.getElementById("editPlayerSubmit").style.display = "inline-block";

    // Ubicar jugador a editar en el array de jugadores
    playerEdited = listOfPlayers.find((el) => el.id === parseInt(id));

    // Desestructuración del jugador a modificar
    let { playerName, xpLevel, playerAge } = playerEdited;

    // Mostrar el nombre del jugador a modificar como placeholder
    document.getElementById("playerNameInput").value = playerName;

    // Mostrar la edad del jugador a modificar como placeholder
    document.getElementById("playerAgeInput").value = playerAge;

    // Seleccionar el nivel del jugador a modificar
    document.getElementById("playerXpLevelSelect").value = xpLevel;

}

let playerDeleted

const deleteButtonHandler = (id, listOfPlayers) => {

    // Ubicar jugador a editar en el array de jugadores
    playerDeleted = listOfPlayers.find((el) => el.id === parseInt(id));

    // Sweet Alert para eliminar jugador
    Swal.fire({
        title: `¿Seguro que quiere eliminar al jugador ${playerDeleted.playerName}?`,
        text: "¡Esta acción no puede revertirse!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Sí, eliminar jugador"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Jugador eliminado`,
                text: `${playerDeleted.playerName} ya no está en el juego`,
                icon: "success"
            });

            // Llamado de función para renderizar eliminación de jugador
            renderDeletedPlayer(playerDeleted, listOfPlayers);

            // Actualización de localStorage
            localStorage.removeItem("listOfPlayers");
            if (listOfPlayers.length) localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers));
        }
    });
}

// Ciclo para renderizar jugadores de ejemplo o guardados en localStorage
updatePlayerCount(listOfPlayers.length);
listOfPlayers.forEach(el => {
    // Renderizado de nuevo jugador e inclusión de eventos para botones de edición y eliminación
    renderPlayer(el, listOfPlayers, editButtonHandler, deleteButtonHandler);
});

// Evento para mostrar botón de agregar nuevo jugador
const addPlayerButtom = document.getElementById("addPlayerButton");
addPlayerButtom.addEventListener("click", () => {
    clearForm();
    // Suprimir botón de editar y mostrar botón de agregar
    document.getElementById("addPlayerSubmit").style.display = "inline-block";
    document.getElementById("editPlayerSubmit").style.display = "none";
})

// Función para agregar jugador
const addPlayer = async () => {

    const name = document.getElementById("playerNameInput").value;

    // Fetch para traer imagen aleatoria de API
    const avatar = await fetch("https://anonymous-animals.azurewebsites.net/avatar/" + name);

    // Crear nuevo jugador (objeto)
    const newPlayer = new Player(document.getElementById("playerNameInput").value, parseInt(document.getElementById("playerXpLevelSelect").value), parseInt(document.getElementById("playerAgeInput").value), avatar.url);

    // Inclusión al array de objetos (lista de jugadores)
    listOfPlayers.push(newPlayer);

    // Guardar nuevo jugador en el localStorage
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers));

    // Renderizado de nuevo jugador
    renderPlayer(newPlayer, listOfPlayers, editButtonHandler, deleteButtonHandler);

    // Limpiar formulario
    clearForm();

    // Actualizar conteo de jugadores
    updatePlayerCount(listOfPlayers.length);

    Toastify({
        text: `${newPlayer.playerName} se ha incluido al juego`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #000, #adb5bd)",
        },
        onClick: function () { }
    }).showToast();

};

// Control para no actualizar página cuando se agregue o edite un jugador
const addEditPlayerForm = document.getElementById("addEditPlayerForm");
addEditPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Eventos para cargar un nuevo jugador
const addPlayerSubmit = document.getElementById("addPlayerSubmit");
addPlayerSubmit.addEventListener("click", () => {
    const playerNameInput = document.getElementById("playerNameInput").value;
    const playerAgeInput = document.getElementById("playerAgeInput").value;
    const playerXpLevelSelect = document.getElementById("playerXpLevelSelect").value;
    if (!playerNameInput || !playerAgeInput || !playerXpLevelSelect) {
        Swal.fire({
            title: "Por favor ingrese todos los campos",
            icon: "error"
        });
    } else {
        addPlayer();
    }
});

// Evento para editar un jugador
const editPlayerSubmit = document.getElementById("editPlayerSubmit");

editPlayerSubmit.addEventListener("click", () => {

    const playerNameInput = document.getElementById("playerNameInput").value;
    const playerAgeInput = document.getElementById("playerAgeInput").value;
    if (!playerNameInput || !playerAgeInput) {
        Swal.fire({
            title: "Por favor ingrese todos los campos",
            icon: "error"
        });
    } else {
        // Modificación de objeto (jugador)
        playerEdited.playerName = document.getElementById("playerNameInput").value;
        playerEdited.playerAge = parseInt(document.getElementById("playerAgeInput").value);
        playerEdited.xpLevel = parseInt(document.getElementById("playerXpLevelSelect").value);
        playerEdited.level = (() => {
            switch (playerEdited.xpLevel) {
                case 1:
                    return "Novato";
                case 2:
                    return "Regular";
                case 3:
                    return "Veterano";
                case 4:
                    return "Profesional";
                default:
                    return "Desconocido"
            };
        })();

        // Función para renderizar edición de jugador
        renderEditedPlayer(playerEdited);

        localStorage.removeItem("listOfPlayers");
        localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers));
    }
});

// Evento para validación numérica de la edad
document.getElementById("playerAgeInput").addEventListener("input", () => {
    (document.getElementById("playerAgeInput").value.length > 0) && ageValidation(document.getElementById("playerAgeInput").value);
});

// Función para validar si el número ingresado es número entero mayor a cero
function ageValidation(newNumber) {
    let enteredNumber = parseInt(newNumber.slice(-1));
    if (isNaN(enteredNumber)) {
        document.getElementById("playerAgeInput").value = newNumber.slice(0, -1)
    };
}