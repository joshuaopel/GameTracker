class IndexedDBManager {
    constructor() {
        this.db = null;
    }

    async init() {
        this.db = await this.openDatabase();
    }

    async openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("SoccerRosterDB", 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore("gameSessions", { keyPath: "id" });
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async saveGameSession(id, gameSession) {
        const tx = this.db.transaction("gameSessions", "readwrite");
        const gameSessionsStore = tx.objectStore("gameSessions");
        game
