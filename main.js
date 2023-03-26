const hardcodedPassword = "pickles";
const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

const login = document.getElementById("login");
const app = document.getElementById("app");

const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");

const startGame = document.getElementById("startGame");
const pauseGame = document.getElementById("pauseGame");
const endGame = document.getElementById("endGame");

const playersDiv = document.getElementById("players");
const saveGame = document.getElementById("saveGame");
const gameHistory = document.getElementById("gameHistory");

// Add your player names here
const playerNames = ["Alice", "Bob", "Charlie", "David"];

let gameInProgress = false;
let gamePaused = false;
let gameTimer;
let gameTime = 0;
const gameTimeDisplay = document.getElementById("gameTime");

function updateGameTimeDisplay() {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    gameTimeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


let players = [];

function createPlayer(name) {
    const player = {
        name: name,
        playing: false,
        position: "",
        playTime: 0,
        benchTime: 0,
        benchStart: null,
    };
    return player;
}

function updateGameHistory() {
    const savedGames = JSON.parse(localStorage.getItem("gameHistory")) || [];
    gameHistory.innerHTML = "";
    savedGames.forEach((game, index) => {
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game");
        gameDiv.innerHTML = `<h3>Game ${index + 1}</h3>`;
        game.players.forEach((player) => {
            const playerDiv = document.createElement("div");
            playerDiv.innerHTML = `${player.name}: ${player.playTime} seconds played as ${player.position}`;
            gameDiv.appendChild(playerDiv);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Game";
        deleteBtn.addEventListener("click", () => {
            savedGames.splice(index, 1);
            localStorage.setItem("gameHistory", JSON.stringify(savedGames));
            updateGameHistory();
        });
        gameDiv.appendChild(deleteBtn);
        gameHistory.appendChild(gameDiv);
    });
}

function updatePlayerDisplay(player, playerDiv) {
    playerDiv.innerHTML = `
        <h3>${player.name}</h3>
        <button class="togglePlay" ${player.playing || !gameInProgress ? "disabled" : ""}>Play</button>
        <select class="position" ${player.playing || !gameInProgress ? "disabled" : ""}>
            ${positions.map((pos) => `<option ${player.position === pos ? "selected" : ""}>${pos}</option>`).join("")}
        </select>
        <button class="toggleBench" ${!player.playing || !gameInProgress ? "disabled" : ""}>${player.benchStart ? "Unbench" : "Bench"}</button>
        <p>Play Time: ${player.playTime} seconds</p>
        <p>Bench Time: ${player.benchTime} seconds</p>
    `;
}

function updatePlayerDisplay(player, playerDiv) {
    playerDiv.querySelector(".togglePlay").disabled = player.playing || !gameInProgress;
    playerDiv.querySelector(".position").disabled = player.playing || !gameInProgress;
    playerDiv.querySelector(".toggleBench").disabled = !player.playing || !gameInProgress;
    playerDiv.querySelector(".position").value = player.position;
    playerDiv.querySelector(".playTime").textContent = `Play Time: ${player.playTime} seconds`;
    playerDiv.querySelector(".benchTime").textContent = `Bench Time: ${player.benchTime} seconds`;
}

function createPlayerDiv(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    const playBtn = document.createElement("button");
    playBtn.classList.add("togglePlay");
    playBtn.textContent = "Play";
    playBtn.addEventListener("click", () => {
        player.playing = true;
        player.benchStart = null;
        updatePlayerDisplay(player, playerDiv);
    });

    const positionSelect = document.createElement("select");
    positionSelect.classList.add("position");
    positions.forEach((position) => {
        const option = document.createElement("option");
        option.value = position;
        option.textContent = position;
        positionSelect.appendChild(option);
    });
    positionSelect.value = player.position;
    positionSelect.addEventListener("change", (e) => {
        player.position = e.target.value;
    });

  

    return playerDiv;
}

loginBtn.addEventListener("click", () => {
    if (passwordInput.value === hardcodedPassword) {
        login.style.display = "none";
        app.style.display = "block";
        passwordInput.value = "";
    } else {
        alert("Incorrect password!");
    }
});


startGame.addEventListener("click", () => {
    gameInProgress = true;
    gamePaused = false;
    startGame.disabled = true;
    pauseGame.disabled = false;
    endGame.disabled = false;

    players.forEach((player) => {
        if (player.playing) {
            player.benchStart = new Date();
        }
    });

    setInterval(() => {
        if (!gameInProgress || gamePaused) return;

        gameTime++;
        updateGameTimeDisplay();

        players.forEach((player, index) => {
            if (player.playing && !player.benchStart) {
                player.playTime++;
            } else if (player.playing && player.benchStart) {
                player.benchTime++;
            }
            updatePlayerDisplay(player, playersDiv.children[index]);
        });
    }, 1000);
});

pauseGame.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseGame.textContent = gamePaused ? "Resume Game" : "Pause Game";
});

endGame.addEventListener("click", () => {
    gameInProgress = false;
    gamePaused = false;
    startGame.disabled = false;
    pauseGame.disabled = true;
    endGame.disabled = true;
    gameTime = 0;
    updateGameTimeDisplay();
});

saveGame.addEventListener("click", () => {
    const gameHistoryData = JSON.parse(localStorage.getItem("gameHistory")) || [];
    const newGameData = {
        players: JSON.parse(JSON.stringify(players)),
    };
    gameHistoryData.push(newGameData);
    localStorage.setItem("gameHistory", JSON.stringify(gameHistoryData));
    updateGameHistory();

    players = playerNames.map(createPlayer);
    playersDiv.innerHTML = "";
    players.forEach((player) => {
        const playerDiv = createPlayerDiv(player);
        playersDiv.appendChild(playerDiv);
    });

    saveGame.disabled = true;
});

players = playerNames.map(createPlayer);
players.forEach((player) => {
    const playerDiv = createPlayerDiv(player);
    playersDiv.appendChild(playerDiv);
});

updateGameHistory();

