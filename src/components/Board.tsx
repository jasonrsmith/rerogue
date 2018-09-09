import * as React from 'react'
import {CSSProperties} from 'react'
import {convert2to1} from '../coordConverter'
import {Tile} from './Tile'

export interface IBoardComponentProps {
    height: number
    width: number
    getStyleForPos: (pos: number) => CSSProperties
}

export const Board: React.SFC<IBoardComponentProps> = (props) => {
    const renderTile = (i: number, j: number) => {
        const key = convert2to1(j, i, props.width)
        return (
            <Tile key={key} style={props.getStyleForPos(key)} />
        )
    }

    const renderRow = (i: number) => {
        const tiles = Array(props.width).fill(1).map((val, j) => renderTile(i, j))
        return (
            <div
                className="board-row"
                key={i}>
                {tiles}
            </div>
        )
    }

    const board = Array(props.height).fill(1).map((val, i) => renderRow(i))
    return <div className="board-container">{board}</div>
}
