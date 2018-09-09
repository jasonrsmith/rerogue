import * as React from 'react'
import {CSSProperties} from 'react'

export interface ITileComponentProps {
    style?: CSSProperties
}

export const Tile: React.SFC<ITileComponentProps> = (props) => {
    if (!props.style) {
        return (<div className="square"/>)
    }

    return (
        <div className="square"
             style={props.style}
        />
    )
}
