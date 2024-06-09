// Función para definir aleatoriamente el color del jugador
import { btnColorDef, imgColorDef } from './utilities.js';

// Función para renderizar eliminación de jugador
export function renderDeletedPlayer(playerDeleted, listOfPlayers) {
    const playerDeletedIndex = listOfPlayers.findIndex((el) => el.id === playerDeleted.id);

    document.getElementById("player-general-info" + playerDeleted.id).remove()

    listOfPlayers.splice(playerDeletedIndex, 1)

    updatePlayerCount(listOfPlayers.length)

    clearForm()
}

// Función para renderizar cambios en jugador
export function renderEditedPlayer(playerEdited) {

    // Desestructuración de jugador editado (objeto)
    let { id, playerName, xpLevel, playerAge, level } = playerEdited

    // Renderizado de nombre modificado, placeholder y limpiar campo de ingreso
    document.getElementById("playerInfoName" + id).innerText = playerName

    // Renderización de edad modificada, placeholder y limpiar campo de ingreso
    document.getElementById("playerInfoAge" + id).innerText = `${playerAge} años`

    // Renderización de nivel y ajuste en lista de niveles
    document.getElementById("playerInfoLevel" + id).innerText = `Nivel ${xpLevel} (${level}) `

    clearForm()
}

// Función para definir aleatoriamente el color del jugador
export function renderPlayer(player, listOfPlayers, editButtonHandler, deleteButtonHandler) {

    const { id, playerName, xpLevel, playerAge, level, avatar } = player;

    // Rederizado de nuevo jugador
    // Card general de jugadores
    const cardOfPlayers = document.getElementById("card-players");

    // Card de jugador nuevo para aplicar estilo flex
    const playerInfo = document.createElement("div");
    playerInfo.className = "card"
    playerInfo.id = "player-general-info" + id


    // Botón con nombre de jugador y color aleatorio para desplegar lista de propiedades
    const playerInfoName = document.createElement("button");
    playerInfoName.className = btnColorDef();
    playerInfoName.type = "button";
    playerInfoName.setAttribute("data-bs-toggle", "collapse");
    playerInfoName.setAttribute("data-bs-target", "#collapsePlayerInfo" + id);
    playerInfoName.setAttribute("aria-expanded", "false");
    playerInfoName.setAttribute("aria-controls", "collapsePlayerInfo" + id);
    playerInfoName.id = "playerInfoName" + id;
    playerInfoName.innerText = playerName;
    playerInfoName.style.fontWeight = "bold";

    // Contenedor de lista colapsible
    const playerInfoContainer = document.createElement("div");
    playerInfoContainer.className = "collapse";
    playerInfoContainer.id = "collapsePlayerInfo" + id;

    // Lista de propiedades
    const playerInfoList = document.createElement("ul");
    playerInfoList.className = "list-group";

    // Avatar del jugador (animal)
    // Item de lista para incluir img
    const playerInfoAvatar = document.createElement("li")
    playerInfoAvatar.className = "list-group-item"
    playerInfoAvatar.id = "playerInfoAvatar" + id
    // Avatar (img)
    const playerAvatar = document.createElement("img");
    playerAvatar.className = "img-fluid img-thumbnail " + imgColorDef();
    playerAvatar.id = "playerAvatar" + id;
    playerAvatar.src = avatar

    // Nivel de jugador
    const playerInfoLevel = document.createElement("li");
    playerInfoLevel.className = "list-group-item";
    playerInfoLevel.id = "playerInfoLevel" + id;
    playerInfoLevel.innerText = `Nivel ${xpLevel} (${level})`;

    // Años del jugador
    const playerInfoAge = document.createElement("li");
    playerInfoAge.className = "list-group-item";
    playerInfoAge.id = "playerInfoAge" + id;
    playerInfoAge.innerText = `${playerAge} años`;

    // Botones de edición o eliminación (NO HABILITADO)

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-group";
    buttonContainer.role = "group";

    const editButton = document.createElement("button");
    const collapseAddEditPlayer = document.getElementById("collapseAddEditPlayer")
    editButton.type = "button"
    editButton.setAttribute("data-bs-target", "#collapseAddEditPlayer");
    editButton.setAttribute("aria-expanded", "false");
    editButton.setAttribute("aria-controls", "collapseAddEditPlayer");
    editButton.id = id
    editButton.className = "btn btn-dark editPlayerButton";
    editButton.innerHTML = '<i class="bi bi-pencil"></i>'; // Imágen de lápiz
    editButton.addEventListener("click", () => {
        editButtonHandler(id, listOfPlayers)
        const expanded = collapseAddEditPlayer.classList.contains("show")
        if (!expanded) new bootstrap.Collapse(collapseAddEditPlayer)
    })

    const deleteButton = document.createElement("button");
    deleteButton.type = "button"
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; // Imágen de basurero
    deleteButton.addEventListener("click", () => {
        deleteButtonHandler(id, listOfPlayers)
    });

    cardOfPlayers.appendChild(playerInfo);
    playerInfo.appendChild(playerInfoName);
    playerInfo.appendChild(playerInfoContainer);
    playerInfo.appendChild(buttonContainer);
    playerInfoContainer.appendChild(playerInfoList);
    playerInfoList.appendChild(playerInfoLevel);
    playerInfoList.appendChild(playerInfoAge);
    playerInfoList.appendChild(playerInfoAvatar)
    playerInfoAvatar.appendChild(playerAvatar)
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

}

// Función para Limpiar formulario luego de agregar un nuevo jugador
export function clearForm() {
    document.getElementById("playerNameInput").value = "";

    // Mostrar la edad del jugador a modificar como placeholder
    document.getElementById("playerAgeInput").value = "";

    // Seleccionar el nivel del jugador a modificar
    document.getElementById("playerXpLevelSelect").value = "";
}

// Función para actualizar conteo de jugadores
export function updatePlayerCount(qtyOfPlayers) {
    document.getElementById("qtyOfPlayers").innerText = `Hay ${qtyOfPlayers} jugadores en la partida`;
}