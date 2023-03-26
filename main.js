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

let gameTimer;
let gameTime = 0;
const gameTimeDisplay = document.getElementById("gameTime");

function updateGameTimeDisplay() {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    gameTimeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

    const benchBtn = document.createElement("button");
    benchBtn.classList.add("toggleBench");
    benchBtn.textContent = player.benchStart ? "Unbench" : "Bench";
    benchBtn.addEventListener("click", () => {
        if (player.benchStart) {
            player.benchStart = null;
        } else {
            player.benchStart = new Date();
        }
        updatePlayerDisplay(player, playerDiv);
    });

    const playTime = document.createElement("p");
    playTime.classList.add("playTime");

    const benchTime = document.createElement("p");
    benchTime.classList.add("benchTime");

    playerDiv.appendChild(playBtn);
    playerDiv.appendChild(positionSelect);
    playerDiv.appendChild(benchBtn);
    playerDiv.appendChild(playTime);
    playerDiv.appendChild(benchTime);

    return playerDiv;
}

function createPlayer(name) {
    return {
        name: name,
        playing: false,
        position: positions[0],
        playTime: 0,
        benchTime: 0,
        benchStart: null,
        benchPauseStart: null,
    };
}

playerNames.forEach((name) => {
    const player = createPlayer(name);
    players.push(player);
    playersDiv.appendChild(createPlayerDiv(player));
});

loginBtn.addEventListener("click", () => {
    if (passwordInput.value === hardcodedPassword) {
        login.style.display = "none";
        app.style.display = "block";
    }
});

startGame.addEventListener("click", () => {
    gameInProgress = true;
    startGame.disabled = true;
    pauseGame.disabled = false;
    endGame.disabled = false;
});

pauseGame.addEventListener("click", () => {
    gamePaused = !gamePaused;
    pauseGame.textContent = gamePaused ? "Resume Game" : "Pause Game";

    if (gamePaused) {
        players.forEach((player) => {
            if (player.playing && player.benchStart) {
                player.benchPauseStart = new Date();
            }
        });
    } else {
        players.forEach((player) => {
            if (player.playing && player.benchPauseStart) {
                player.benchStart = new Date(new Date() - (player.benchPauseStart - player.benchStart));
                player.benchPauseStart = null;
            }
        });
    }
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
    const savedGame = {
        date: new Date(),
        players: players.map((player) => ({ ...player })),
        gameTime: gameTime,
    };

    const savedGameDiv = document.createElement("div");
    savedGameDiv.classList.add("savedGame");
    savedGameDiv.textContent = `Game on ${savedGame.date.toLocaleString()}: ${savedGame.gameTime} seconds`;

    gameHistory.appendChild(savedGameDiv);
});

setInterval(() => {
    if (gameInProgress && !gamePaused) {
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
    }
}, 1000);
