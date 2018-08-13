import React from 'react'
import Player from './Player'
import {connect} from 'react-redux'

class Tile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="square">
                {this.props.entity && <Player/>}
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
