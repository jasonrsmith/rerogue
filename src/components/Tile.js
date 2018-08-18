import React from 'react'
import Player from './Player'
import {connect} from 'react-redux'

class Tile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let pStyle = {
            background: "url('dungeon.png') no-repeat -0px -64px",
            width: '64px',
            height: '64px',
        }

        return (
            <div className="square"
                 style={pStyle}
            >
            </div>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    let player = state.player
    if (player.x === ownProps.x && player.y === ownProps.y) {
        return {'entity': true}
    }
    return {}
}

const mapDispatchToProps = function (dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tile)
