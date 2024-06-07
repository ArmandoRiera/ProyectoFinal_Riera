// Clase constructora de jugador
export class Player {
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