import React from 'react';

export default (xlen, ylen, Tile) =>
class Board extends React.Component {
    constructor(props) {
        super(props);
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
        let tiles = Array(xlen).fill(1).map((val, j) => this.renderTile(i, j));
        return (
            <div
                className="board-row"
                key={i}>
                {tiles}
            </div>
        )
    }

    render() {
        return Array(ylen).fill(1).map((val, i) => this.renderRow(i));
    }
}
