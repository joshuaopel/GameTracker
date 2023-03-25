class UIManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Assuming you have elements with these IDs in your HTML
        const addPlayerBtn = document.getElementById('addPlayerBtn');
        const startGameBtn = document.getElementById('startGameBtn');
        const pauseGameBtn = document.getElementById('pauseGameBtn');
        const endGameBtn = document.getElementById('endGameBtn');

        // Set up event listeners for buttons
        addPlayerBtn.addEventListener('click', this.addPlayer.bind(this));
        startGameBtn.addEventListener('click', this.startGame.bind(this));
        pauseGameBtn.addEventListener('click', this.pauseGame.bind(this));
        endGameBtn.addEventListener('click', this.endGame.bind(this));
    }

    addPlayer() {
        // Assuming you have input elements with these IDs in your HTML
        const playerNameInput = document.getElementById('playerName');
        const playerAbbrInput = document.getElementById('playerAbbr');

        playerManager.addPlayer(playerNameInput.value, playerAbbrInput.value);

        // Clear input fields after adding a player
        playerNameInput.value = '';
        playerAbbrInput.value = '';

        // Update the UI to display the added player
        // You will need to implement this function to update your specific UI
        this.updatePlayerList();
    }

    startGame() {
        // Assuming you have input elements with these IDs in your HTML
        const gameLengthInput = document.getElementById('gameLength');
        const halftimeLengthInput = document.getElementById('halftimeLength');

        gameManager.createGameSession(
            parseInt(gameLengthInput.value),
            parseInt(halftimeLengthInput.value)
        );
    }

    pauseGame() {
        timerManager.pauseTimers();
    }

    endGame() {
        gameManager.endGame();
    }

    updatePlayerList() {
        // You will need to implement this function to update your specific UI
    }
}

const uiManager = new UIManager();
