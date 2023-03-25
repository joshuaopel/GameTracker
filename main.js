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
       
