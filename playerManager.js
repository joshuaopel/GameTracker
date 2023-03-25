class Player {
    constructor(name, abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.fieldTime = 0;
        this.benchTime = 0;
        this.isOnField = false;
        this.position = null;
    }

    setOnField(position) {
        this.isOnField = true;
        this.position = position;
    }

    setOnBench() {
        this.isOnField = false;
        this.position = null;
    }
}

class PlayerManager {
    constructor() {
        this.players = [];
    }

    addPlayer(name, abbreviation) {
        const player = new Player(name, abbreviation);
        this.players.push(player);
    }

    getPlayerByName(name) {
        return this.players.find(player => player.name === name);
    }

    updatePlayerTimes() {
        this.players.forEach(player => {
            if (player.isOnField) {
                player.fieldTime++;
            } else {
                player.benchTime++;
            }
        });
    }
}

const playerManager = new PlayerManager();
