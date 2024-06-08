// Función para definir aleatoriamente el color del jugador
import { btnColorDef } from './utilities.js';

// Función para definir aleatoriamente el color del jugador
export function renderPlayer(player, listOfPlayers, editButtonHandler, deleteButtonHandler) {

    const { id, playerName, xpLevel, playerAge, level } = player;

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

    // Contenedor de lista colapsible
    const playerInfoContainer = document.createElement("div");
    playerInfoContainer.className = "collapse";
    playerInfoContainer.id = "collapsePlayerInfo" + id;

    // Lista de propiedades
    const playerInfoList = document.createElement("ul");
    playerInfoList.className = "list-group";

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
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Ciclo para agregar jugadores a listas de editar o eliminar jugadores
    const deletePlayerList = document.getElementById("deletePlayerSelect");

    // Inclusión de jugador en lista de eliminación
    const deleteAddListItem = document.createElement("option");
    deleteAddListItem.value = `${id}`;
    deleteAddListItem.id = `${id}`;
    deleteAddListItem.innerText = playerName;

    deletePlayerList.appendChild(deleteAddListItem);
}

// Función para Limpiar formulario luego de agregar un nuevo jugador
export function clearForm() {
    document.getElementById("playerNameInput").value = "";
    document.getElementById("playerXpLevelSelect").value = "";
    document.getElementById("playerAgeInput").value = "";
}

// Función para actualizar conteo de jugadores
export function updatePlayerCount(qtyOfPlayers) {
    document.getElementById("qtyOfPlayers").innerText = `Hay ${qtyOfPlayers} jugadores en la partida`;

    // Condicionales para mostrar o no los formularios de edición y eliminación
    document.getElementById("deletePlayerForm").style.display = qtyOfPlayers ? "block" : "none"
}