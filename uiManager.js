class UIManager {
    constructor() {
        this.setupEventListeners();
    }

    checkPasscode() {
        const passcodeInput = document.getElementById('passcodeInput');
        const messageContainer = document.getElementById('messageContainer');
        const message = document.getElementById('message');
        const passcodeContainer = document.getElementById('passcodeContainer');
        const rosterToolContainer = document.getElementById('rosterToolContainer');

        if (passcodeInput.value === PASSCODE) {
            messageContainer.style.display = 'none';
            passcodeContainer.style.display = 'none';
            rosterToolContainer.style.display = 'block';
        } else {
            messageContainer.style.display = 'block';
            message.textContent = 'Incorrect passcode. Please try again.';
        }
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
