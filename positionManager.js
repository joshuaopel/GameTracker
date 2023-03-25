class PositionManager {
    constructor() {
        this.positions = [
            'Goalie',
            'Left Def',
            'Right Def',
            'Center Def',
            'Center MF',
            'Left MF',
            'Right MF',
            'Left F',
            'Right F',
            'Center F'
        ];
    }

    getPositions() {
        return this.positions;
    }
}

const positionManager = new PositionManager();
