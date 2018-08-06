import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.xlen = 6;
        this.ylen = 8;
        this.entities = Array(this.xlen * this.ylen);
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        xlen={this.xlen}
                        ylen={this.ylen}
                        entities={this.entities}
                    />
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}

export default Game;
