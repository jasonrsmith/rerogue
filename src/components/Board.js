import React from 'react';
import Tile from './Tile';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.xlen = props.xlen;
        this.ylen = props.ylen;
    }

    renderTile(i, j) {
        let key = i + "," + j;
        return (
            <Tile
                key={key}
                x={j}
                y={i}
            />
        );
    }

    renderRow(i) {
        let tiles = Array(this.xlen).fill(1).map((val, j) => this.renderTile(i, j));
        return (
            <div
                className="board-row"
                key={i}>
                {tiles}
            </div>
        )
    }

    render() {
        return Array(this.ylen).fill(1).map((val, i) => this.renderRow(i));
    }
}

export default Board;
