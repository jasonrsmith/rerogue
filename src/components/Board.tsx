import * as React from 'react'
import {ITileComponentProps} from './Tile'

export interface IBoardComponentProps {
    height: number
    width: number
}

export const createBoardComponent = (Tile: React.ComponentType<ITileComponentProps>) =>
    class Board extends React.Component<IBoardComponentProps> {
        public render() {
            return Array(this.props.height).fill(1).map((val, i) => this.renderRow(i))
        }

        private renderTile(i: number, j: number) {
            const key = i + ',' + j
            return (
                <Tile
                    key={key}
                    x={j}
                    y={i}
                />
            )
        }

        private renderRow(i: number) {
            const tiles = Array(this.props.width).fill(1).map((val, j) => this.renderTile(i, j))
            return (
                <div
                    className="board-row"
                    key={i}>
                    {tiles}
                </div>
            )
        }
    }
