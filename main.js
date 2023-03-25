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
        gameHistory.appendChild(gameDiv);
    });
}

function updatePlayerDisplay(player, playerDiv) {
    playerDiv.innerHTML = `
        <h3>${player.name}</h3>
        <button class="togglePlay" ${player.playing ? "disabled" : ""}>Play</button>
        <select class="position" ${player.playing ? "disabled" : ""}>
            ${positions.map((pos) => `<option ${player.position === pos ? "selected" : ""}>${pos}</option>`).join("")}
        </select>
        <button class="toggleBench" ${!player.playing ? "disabled" : ""}>${player.benchStart ? "Unbench" : "Bench"}</button>
        <p>Play Time: ${player.playTime} seconds</p>
        <p>Bench Time: ${player.benchTime} seconds</p>
    `;
}

function createPlayerDiv(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    updatePlayerDisplay(player, playerDiv);

    playerDiv.querySelector(".togglePlay").addEventListener("click", () => {
        player.playing = true;
        player.benchStart = null;
        updatePlayerDisplay(player, playerDiv);
    });

    playerDiv.querySelector(".position").addEventListener("change", (e) => {
        player.position = e.target.value;
    });

    playerDiv.querySelector(".toggleBench").addEventListener("click", () => {
        if (player.benchStart) {
            player.benchStart = null;
        } else {
            player.benchStart = new Date();
        }
        updatePlayerDisplay(player, playerDiv);
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
    saveGame.disabled = false;
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

