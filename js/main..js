// Lista de jugadores de ejemplo
const listOfPlayersExample = [
    {
        playerName: "Carlos",
        xpLevel: 1,
        playerAge: 28,
        level: "Novato",
        id: 1234
    },
    {
        playerName: "Ana",
        xpLevel: 3,
        playerAge: 31,
        level: "Veterano",
        id: 4321
    },
    {
        playerName: "Luis",
        xpLevel: 4,
        playerAge: 27,
        level: "Profesional",
        id: 2345
    },
    {
        playerName: "María",
        xpLevel: 2,
        playerAge: 30,
        level: "Regular",
        id: 5432
    },
    {
        playerName: "Jorge",
        xpLevel: 1,
        playerAge: 25,
        level: "Novato",
        id: 3456
    },
    {
        playerName: "Gabriela",
        xpLevel: 2,
        playerAge: 33,
        level: "Regular",
        id: 6543
    },
    {
        playerName: "Ricardo",
        xpLevel: 4,
        playerAge: 35,
        level: "Profesional",
        id: 4567
    },
    {
        playerName: "Valentina",
        xpLevel: 3,
        playerAge: 29,
        level: "Veterano",
        id: 7654
    }
];

// Clase constructora de jugador
class Player {
    constructor(playerName, xpLevel, playerAge) {
        this.playerName = playerName;
        this.xpLevel = xpLevel;
        this.playerAge = playerAge;
        this.level = this.levelDefinition()
        this.id = this.idDefinition()
    };
    levelDefinition() {
        switch (this.xpLevel) {
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
    };
    idDefinition() {
        const playerId = Math.floor(Math.random() * 9999) + 1
        return playerId
    }
};

// Función para definir color de botones de forma aleatoria
function btnColorDef() {
    switch (Math.floor(Math.random() * 7) + 1) {
        case 1:
            return "btn btn-primary";
        case 2:
            return "btn btn-secondary";
        case 3:
            return "btn btn-success";
        case 4:
            return "btn btn-danger";
        case 5:
            return "btn btn-warning";
        case 6:
            return "btn btn-info";
        case 7:
            return "btn btn-dark";
        default:
            return "btn btn-light";
    };
};

// Array de participantes
// let listOfPlayers = listOfPlayersExample;

let listOfPlayers = JSON.parse(localStorage.getItem("listOfPlayers")) || [];

// Ciclo para renderizar jugadores de ejemplo o guardados en localStorage
listOfPlayers.forEach(el => {

    // Renderizar jugadores de ejemplo
    const cardOfPlayers = document.getElementById("card-players")

    const playerInfo = document.createElement("div");
    playerInfo.className = "card"
    playerInfo.id = "player-general-info" + el.id

    const playerInfoName = document.createElement("button");
    playerInfoName.className = btnColorDef();
    playerInfoName.type = "button";
    playerInfoName.setAttribute("data-bs-toggle", "collapse");
    playerInfoName.setAttribute("data-bs-target", "#collapsePlayerInfo" + el.id);
    playerInfoName.setAttribute("aria-expanded", "false");
    playerInfoName.setAttribute("aria-controls", "collapsePlayerInfo" + el.id);
    playerInfoName.id = "playerInfoName" + el.id
    playerInfoName.innerText = el.playerName;

    const playerInfoContainer = document.createElement("div");
    playerInfoContainer.className = "collapse";
    playerInfoContainer.id = "collapsePlayerInfo" + el.id;

    const playerInfoList = document.createElement("ul");
    playerInfoList.className = "list-group";

    const playerInfoLevel = document.createElement("li");
    playerInfoLevel.className = "list-group-item";
    playerInfoLevel.id = "playerInfoLevel" + el.id
    playerInfoLevel.innerText = `Nivel ${el.xpLevel} (${el.level})`;

    const playerInfoAge = document.createElement("li");
    playerInfoAge.className = "list-group-item";
    playerInfoAge.id = "playerInfoAge" + el.id
    playerInfoAge.innerText = `${el.playerAge} años`;

    cardOfPlayers.appendChild(playerInfo)
    playerInfo.appendChild(playerInfoName);
    playerInfo.appendChild(playerInfoContainer);
    playerInfoContainer.appendChild(playerInfoList);
    playerInfoList.appendChild(playerInfoLevel);
    playerInfoList.appendChild(playerInfoAge);

    // Ciclo para agregar jugadores a listas de editar o eliminar jugadores
    const editPlayerList = document.getElementById("editPlayerSelect")
    const deletePlayerList = document.getElementById("deletePlayerSelect")

    const editAddListItem = document.createElement("option")
    editAddListItem.value = `${el.id}`
    editAddListItem.id = `${el.id}`
    editAddListItem.innerText = el.playerName

    const deleteAddListItem = document.createElement("option")
    deleteAddListItem.value = `${el.id}`
    deleteAddListItem.id = `${el.id}`
    deleteAddListItem.innerText = el.playerName

    editPlayerList.appendChild(editAddListItem)
    deletePlayerList.appendChild(deleteAddListItem)

    document.getElementById("qtyOfPlayers").innerText = `Hay ${listOfPlayers.length} jugadores en la partida`

    document.getElementById("editPlayerForm").style.display = "block"
    document.getElementById("deletePlayerForm").style.display = "block"

})

// Variables para indicar si se usa o no la experiencia y/o edad de los jugadores (NO SE ESTÁN APLICANDO AÚN)
const xpLvlConfirm = true

const playerAgeConfirm = true

// Función para agregar jugador
function addPlayer(xpLvlConfirm, playerAgeConfirm) {
    const playerName = document.getElementById("playerNameInput")
    let xpLevel;
    let playerAge;

    if (xpLvlConfirm) {
        xpLevel = document.getElementById("playerXpLevelSelect");
    };

    if (playerAgeConfirm) {
        playerAge = document.getElementById("playerAgeInput");
    };

    const newPlayer = new Player(playerName.value, parseInt(xpLevel.value), parseInt(playerAge.value));

    listOfPlayers.push(newPlayer)

    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))

    // Rederizado de nuevo jugador
    const cardOfPlayers = document.getElementById("card-players");

    const playerInfo = document.createElement("div");
    playerInfo.className = "card"
    playerInfo.id = "player-general-info" + newPlayer.id

    const playerInfoName = document.createElement("button");
    playerInfoName.className = btnColorDef();
    playerInfoName.type = "button";
    playerInfoName.setAttribute("data-bs-toggle", "collapse");
    playerInfoName.setAttribute("data-bs-target", "#collapsePlayerInfo" + newPlayer.id);
    playerInfoName.setAttribute("aria-expanded", "false");
    playerInfoName.setAttribute("aria-controls", "collapsePlayerInfo" + newPlayer.id);
    playerInfoName.id = "playerInfoName" + newPlayer.id;
    playerInfoName.innerText = newPlayer.playerName;

    const playerInfoContainer = document.createElement("div");
    playerInfoContainer.className = "collapse";
    playerInfoContainer.id = "collapsePlayerInfo" + newPlayer.id;

    const playerInfoList = document.createElement("ul");
    playerInfoList.className = "list-group";

    const playerInfoLevel = document.createElement("li");
    playerInfoLevel.className = "list-group-item";
    playerInfoLevel.id = "playerInfoLevel" + newPlayer.id;
    playerInfoLevel.innerText = `Nivel ${newPlayer.xpLevel} (${newPlayer.level})`;

    const playerInfoAge = document.createElement("li");
    playerInfoAge.className = "list-group-item";
    playerInfoAge.id = "playerInfoAge" + newPlayer.id;
    playerInfoAge.innerText = `${newPlayer.playerAge} años`;

    cardOfPlayers.appendChild(playerInfo);
    playerInfo.appendChild(playerInfoName);
    playerInfo.appendChild(playerInfoContainer);
    playerInfoContainer.appendChild(playerInfoList);
    playerInfoList.appendChild(playerInfoLevel);
    playerInfoList.appendChild(playerInfoAge);

    // Ciclo para agregar jugadores a listas de editar o eliminar jugadores
    const editPlayerList = document.getElementById("editPlayerSelect")
    const deletePlayerList = document.getElementById("deletePlayerSelect")

    const editAddListItem = document.createElement("option")
    editAddListItem.value = `${newPlayer.id}`
    editAddListItem.id = `${newPlayer.id}`
    editAddListItem.innerText = newPlayer.playerName

    const deleteAddListItem = document.createElement("option")
    deleteAddListItem.value = `${newPlayer.id}`
    deleteAddListItem.id = `${newPlayer.id}`
    deleteAddListItem.innerText = newPlayer.playerName

    editPlayerList.appendChild(editAddListItem)
    deletePlayerList.appendChild(deleteAddListItem)

    // Limpiar formulario para agregar un nuevo jugador
    playerName.value = ""
    xpLevel.value = ""
    playerAge.value = ""

    document.getElementById("qtyOfPlayers").innerText = `Hay ${listOfPlayers.length} jugadores en la partida`

    if (listOfPlayers.length === 1) {
        document.getElementById("editPlayerForm").style.display = "block"
        document.getElementById("deletePlayerForm").style.display = "block"
    }
}

// Control para no actualizar página cuando se agregue un nuevo jugador
const addPlayerForm = document.getElementById("addPlayerForm");
const addPlayerSubmit = document.getElementById("addPlayerSubmit");

addPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

addPlayerSubmit.addEventListener("click", () => addPlayer(xpLvlConfirm, playerAgeConfirm));

// Edición de jugador
const editPlayerList = document.getElementById("editPlayerSelect");

let playerNameEdited
let playerXpLevelEdited
let playerAgeEdited

editPlayerList.addEventListener("input", () => {

    const playerEdited = listOfPlayers.find((el) => el.id === parseInt(editPlayerList.value));

    const editPlayerNameInput = document.getElementById("editPlayerNameInput");

    editPlayerNameInput.placeholder = playerEdited.playerName;

    playerNameEdited = false;

    const editPlayerAgeInput = document.getElementById("editPlayerAgeInput");

    editPlayerAgeInput.placeholder = playerEdited.playerAge;

    playerAgeEdited = false

    const editPlayerXpLevelPlaceholder = document.getElementById("editPlayerXpLevelPlaceholder");

    editPlayerXpLevelPlaceholder.innerText = `Nivel ${playerEdited.xpLevel} (${playerEdited.level})`;

    playerXpLevelEdited = false

});

// Borrar "placeholder" del selector cuando se activa la lista + modificación variable bandera de edición de nivel
const editPlayerXpLevelSelect = document.getElementById("editPlayerXpLevelSelect");

editPlayerXpLevelSelect.addEventListener("click", () => {
    const editPlayerXpLevelPlaceholder = document.getElementById("editPlayerXpLevelPlaceholder");
    editPlayerXpLevelPlaceholder.innerText = "";

    playerXpLevelEdited = true
})

// Ctrl. de cambio en campos de edición (variables bandera)

// Modificación bandera de edición de nombre
const editPlayerNameInput = document.getElementById("editPlayerNameInput");

editPlayerNameInput.addEventListener("input", () => {
    playerNameEdited = true
})

// Modificación bandera de edición de edad
const editPlayerAgeInput = document.getElementById("editPlayerAgeInput");

editPlayerAgeInput.addEventListener("input", () => {
    playerAgeEdited = true
})


// Función para editar propiedades de jugador
function editSelectedPlayer(playerNameEdited, playerAgeEdited, playerXpLevelEdited) {

    const playerEdited = listOfPlayers.find((el) => el.id === parseInt(editPlayerList.value));

    const playerEditedIndex = listOfPlayers.findIndex((el) => el.id === parseInt(editPlayerList.value));

    if (playerNameEdited) {

        const playerInfoName = document.getElementById("playerInfoName" + editPlayerList.value);

        playerInfoName.innerText = editPlayerNameInput.value;

        editPlayerList[playerEditedIndex + 1].innerText = editPlayerNameInput.value;

        deletePlayerList[playerEditedIndex + 1].innerText = editPlayerNameInput.value;

        playerEdited.playerName = editPlayerNameInput.value;

        editPlayerNameInput.placeholder = playerEdited.playerName;

        editPlayerNameInput.value = "";

    };

    if (playerAgeEdited) {

        const playerInfoAge = document.getElementById("playerInfoAge" + editPlayerList.value);

        playerInfoAge.innerText = editPlayerAgeInput.value;

        playerEdited.playerAge = parseInt(editPlayerAgeInput.value);

        editPlayerAgeInput.placeholder = playerEdited.playerAge;

        editPlayerAgeInput.value = "";

    };

    if (playerXpLevelEdited) {

        const playerInfoLevel = document.getElementById("playerInfoLevel" + editPlayerList.value)

        playerEdited.xpLevel = parseInt(editPlayerXpLevelSelect.value)

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

        playerInfoLevel.innerText = `Nivel ${playerEdited.xpLevel} (${playerEdited.level})`

        const editPlayerXpLevelPlaceholder = document.getElementById("editPlayerXpLevelPlaceholder");

        editPlayerXpLevelPlaceholder.innerText = `Nivel ${playerEdited.xpLevel} (${playerEdited.level})`;

    }

    localStorage.removeItem("listOfPlayers")
    localStorage.setItem("listOfPlayers", JSON.stringify(listOfPlayers))

};

// Control para no actualizar página cuando se edite un nuevo jugador
const editPlayerForm = document.getElementById("editPlayerForm");
const editPlayerSubmit = document.getElementById("editPlayerSubmit");

editPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

editPlayerSubmit.addEventListener("click", () => {
    editSelectedPlayer(playerNameEdited, playerAgeEdited, playerXpLevelEdited);
    playerNameEdited = false;
    playerAgeEdited = false;
    playerXpLevelEdited = false;
});

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

// Función para elegir una opción del listado (valida si se ingresa texto o decimal)
function selectOption(textOption, numOptions) {
    do {
        const newOption = prompt(textOption);

        if (newOption === null) {
            return null
        }

        const option = newOption.replace(",", ".");
        const numberOption = parseFloat(option);

        if (!isNaN(numberOption) && Number.isInteger(numberOption) && numberOption >= 1 && numberOption <= numOptions) {
            return numberOption;
        } else {
            alert("Por favor, ingrese una opción válida (del 1 al " + numOptions + ")");
        };

    } while (true);
};

// Función para validar si el número ingresado es número entero mayor a cero
function ageValidation(newNumber) {
    const enteredNumber = parseFloat(newNumber.replace(",", "."));

    if (!isNaN(enteredNumber) && Number.isInteger(enteredNumber) && (enteredNumber > 0)) {
        return enteredNumber;
    } else {
        alert("Por favor ingrese un número entero mayor a cero");
    };
}

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