import React from 'react'

export default (getStyleForGid) =>
class Tile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        let pStyle = getStyleForGid(this.props.backgroundGid)
        /*
        let pStyle = {
            background: "url('dungeon.png') no-repeat -0px -64px",
            width: '64px',
            height: '64px',
        }
        */


        return (
            <div className="square"
                 style={pStyle}
            >
                {this.props.x},{this.props.y}
            </div>
        )
    }
}
