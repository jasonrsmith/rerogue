import * as React from 'react'

export interface ITileComponentProps {
    x: number
    y: number
    backgroundGid?: number
}

export const createTileComponent = (getStyleForGid: (gid: number) => React.CSSProperties) =>
    class Tile extends React.Component<ITileComponentProps> {
        public render() {
            if (!this.props.backgroundGid) {
                return (<div className="square"/>)
            }

            const pStyle = getStyleForGid(this.props.backgroundGid)
            return (
                <div className="square"
                     style={pStyle}
                />
            )
        }
    }
