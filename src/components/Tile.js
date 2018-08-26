import React from 'react'

export default (getStyleForGid) =>
    class Tile extends React.Component {
        render() {
            const pStyle = getStyleForGid(this.props.backgroundGid)
            return (
                <div className="square"
                     style={pStyle}
                >
                </div>
            )
        }
    }
