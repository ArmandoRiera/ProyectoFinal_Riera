// Lista de ejemplo de jugadores (array de objetos)
import listOfPlayersExample from './samplePlayers.js';

// Módulo con clase constructora de nuevo jugador (objeto)
import { Player } from './player.js';

// Función para renderizar jugadores
import { clearForm, renderPlayer, updatePlayerCount } from './dom.js';

let listOfPlayers = JSON.parse(localStorage.getItem("listOfPlayers")) || listOfPlayersExample;

let playerEdited

const editButtonHandler = (id, listOfPlayers) => {

    // Suprimir botón de agregar y mostrar botón de editar
    document.getElementById("addPlayerSubmit").style.display = "none"
    document.getElementById("editPlayerSubmit").style.display = "inline-block"

    // Ubicar jugador a editar en el array de jugadores
    playerEdited = listOfPlayers.find((el) => el.id === parseInt(id));

    // Desestructuración del jugador a modificar
    let { playerName, xpLevel, playerAge } = playerEdited

    // Mostrar el nombre del jugador a modificar como placeholder
    document.getElementById("playerNameInput").value = playerName

    // Mostrar la edad del jugador a modificar como placeholder
    document.getElementById("playerAgeInput").value = playerAge

    // Seleccionar el nivel del jugador a modificar
    document.getElementById("playerXpLevelSelect").value = xpLevel

}

let playerDeleted

const deleteButtonHandler = (id, listOfPlayers) => {

    // Ubicar jugador a editar en el array de jugadores
    playerDeleted = listOfPlayers.find((el) => el.id === parseInt(id));

    console.log(playerDeleted)

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
            renderDeletedPlayer(playerDeleted)
        }
    });

}

// Ciclo para renderizar jugadores de ejemplo o guardados en localStorage
updatePlayerCount(listOfPlayers.length)

listOfPlayers.forEach(el => {

    // Renderizado de nuevo jugador e inclusión de eventos para botones de edición y eliminación
    renderPlayer(el, listOfPlayers, editButtonHandler, deleteButtonHandler)

})

// Evento para mostrar botón de agregar nuevo jugador
const addPlayerButtom = document.getElementById("addPlayerButton")

const resetForm = () => {
    document.getElementById("playerNameInput").value = ""

    // Mostrar la edad del jugador a modificar como placeholder
    document.getElementById("playerAgeInput").value = ""

    // Seleccionar el nivel del jugador a modificar
    document.getElementById("playerXpLevelSelect").value = ""
}

addPlayerButtom.addEventListener("click", () => {

    resetForm()

    // Suprimir botón de editar y mostrar botón de agregar
    document.getElementById("addPlayerSubmit").style.display = "inline-block"
    document.getElementById("editPlayerSubmit").style.display = "none"
})

// Función para agregar jugador
function addPlayer() {

    // Crear nuevo jugador (objeto)
    const newPlayer = new Player(document.getElementById("playerNameInput").value, parseInt(document.getElementById("playerXpLevelSelect").value), parseInt(document.getElementById("playerAgeInput").value));

    // Inclusión al array de objetos (lista de jugadores)
    listOfPlayers.push(newPlayer)

    // Guardar nuevo jugador en el localStorage
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))

    // Renderizado de nuevo jugador
    renderPlayer(newPlayer, listOfPlayers, editButtonHandler, deleteButtonHandler)

    // Limpiar formulario
    clearForm()

    // Actualizar conteo de jugadores
    updatePlayerCount(listOfPlayers.length)

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

}

// Control para no actualizar página cuando se agregue o edite un jugador
const addEditPlayerForm = document.getElementById("addEditPlayerForm");
addEditPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Evento para cargar un nuevo jugador
const addPlayerSubmit = document.getElementById("addPlayerSubmit");
addPlayerSubmit.addEventListener("click", () => addPlayer());

// Evento para editar un jugador
const editPlayerSubmit = document.getElementById("editPlayerSubmit");

editPlayerSubmit.addEventListener("click", () => {

    // Modificación de objeto (jugador)
    playerEdited.playerName = document.getElementById("playerNameInput").value
    playerEdited.playerAge = parseInt(document.getElementById("playerAgeInput").value)
    playerEdited.xpLevel = parseInt(document.getElementById("playerXpLevelSelect").value)
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
    renderEditedPlayer(playerEdited)

    localStorage.removeItem("listOfPlayers")
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))

});

// Función para renderizar cambios en jugador
function renderEditedPlayer(playerEdited) {

    // Desestructuración de jugador editado (objeto)
    let { id, playerName, xpLevel, playerAge, level } = playerEdited

    // Renderizado de nombre modificado, placeholder y limpiar campo de ingreso
    document.getElementById("playerInfoName" + id).innerText = playerName

    // Renderización de edad modificada, placeholder y limpiar campo de ingreso
    document.getElementById("playerInfoAge" + id).innerText = `${playerAge} años`

    // Renderización de nivel y ajuste en lista de niveles
    document.getElementById("playerInfoLevel" + id).innerText = `Nivel ${xpLevel} (${level}) `

    resetForm()
}

// Función para renderizar eliminación de jugador
function renderDeletedPlayer(playerDeleted) {
    const playerDeletedIndex = listOfPlayers.findIndex((el) => el.id === playerDeleted.id);

    console.log(playerDeleted)

    console.log(playerDeletedIndex)

    document.getElementById("player-general-info" + playerDeleted.id).remove()

    listOfPlayers.splice(playerDeletedIndex, 1)

    updatePlayerCount(listOfPlayers.length)

    clearForm()

    localStorage.removeItem("listOfPlayers")
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))
}

// Eliminar un jugador
const deletePlayerList = document.getElementById("deletePlayerSelect");

function deleteSelectedPlayer() {
    const playerDeleted = listOfPlayers.find((el) => el.id === parseInt(deletePlayerList.value));

    const playerDeletedIndex = listOfPlayers.findIndex((el) => el.id === parseInt(deletePlayerList.value));

    document.getElementById("player-general-info" + playerDeleted.id).remove()

    editPlayerList[playerDeletedIndex + 1].remove()

    deletePlayerList[playerDeletedIndex + 1].remove()

    listOfPlayers.splice(playerDeletedIndex, 1)

    document.getElementById("qtyOfPlayers").innerText = `Hay ${listOfPlayers.length} jugadores en la partida`

    if (listOfPlayers.length === 0) {
        document.getElementById("editPlayerForm").style.display = "none"
        document.getElementById("deletePlayerForm").style.display = "none"
    }

    localStorage.removeItem("listOfPlayers")
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))

}

// Control para no actualizar página cuando se elimine un jugador
const deletePlayerForm = document.getElementById("deletePlayerForm");
const deletePlayerSubmit = document.getElementById("deletePlayerSubmit");

deletePlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

deletePlayerSubmit.addEventListener("click", () => deleteSelectedPlayer());

// Función para validar si el número ingresado es número entero mayor a cero
// function ageValidation(newNumber) {
//     const enteredNumber = parseFloat(newNumber.replace(",", "."));
//     if (!isNaN(enteredNumber) && Number.isInteger(enteredNumber) && (enteredNumber > 0)) {
//         return enteredNumber;
//     } else {
//         alert("Por favor ingrese un número entero mayor a cero");
//     };
// }

// Algoritmo para asegurar nivelación de equipos según experiencia (en desarrollo)
// const list = [4, 2, 3, 3, 1, 4, 3, 2]
// let sum = 0;
// let n = list.length;
// sum = list.reduce((acc, curr) => acc += curr, 0)
// let found = false;
// let lsum = 0;
// for (let i = 0; i < n - 1; i++) {
//     lsum += list[i];
//     let rsum = sum - lsum;
//     // If averages of arr[0...i]
//     // and arr[i+1..n-1] are same.
//     // To avoid floating point problems
//     // we compare "lsum(n-i+1)"
//     // and "rsum(i+1)" instead of
//     // "lsum/(i+1)" and "rsum/(n-i+1)"
//     const avgC = Math.abs((lsum / (i + 1)) - (rsum / (n - i))) <= 2
//     if (avgC) {
//         console.log("From (0 " + i + ") to (" + (i + 1) + " " + (n - 1) + ")\n");
//         found = true;
//     }
// }
// // If no subarrays found
// if (found == false) console.log('Not found')
// alert(`${found} - ${lsum} - ${sum}`)