class TimerManager {
    constructor(playerManager) {
        this.playerManager = playerManager;
        this.timers = {
            gameTimer: 0,
            halftimeLength: 0,
            totalGameLength: 0
        };
        this.timerInterval = null;
        this.gamePaused = false;
    }

    startTimers(halftimeLength, totalGameLength) {
        this.timers.halftimeLength = halftimeLength;
        this.timers.totalGameLength = totalGameLength;

        this.timerInterval = setInterval(() => {
            if (!this.gamePaused) {
                this.timers.gameTimer++;

                if (this.timers.gameTimer === this.timers.halftimeLength) {
                    this.pauseTimers(); // Automatically pause timers at halftime
                }

                if (this.timers.gameTimer === this.timers.totalGameLength) {
                    this.stopTimers(); // Automatically stop timers at the end of the game
                }

                this.playerManager.updatePlayerTimes();
            }
        }, 1000);
    }

    pauseTimers() {
        this.gamePaused = !this.gamePaused;
    }

    stopTimers() {
        clearInterval(this.timerInterval);
    }

    getElapsedTime() {
        return this.timers.gameTimer;
    }
}

const timerManager = new TimerManager(playerManager);
