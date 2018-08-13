import React from 'react'
import Board from './Board'
import * as ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {DIRECTION, movePlayer} from '../actions/game'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.xlen = 6
        this.ylen = 8
        this.entities = Array(this.xlen * this.ylen)
    }

    render() {
        return (
            <div
                ref="gameDiv"
                className="game"
                onKeyDown={(e) => this.onKeyPressed(e)}
                tabIndex="0"
            >
                <div
                    className="game-board"
                >
                    <Board
                        xlen={this.xlen}
                        ylen={this.ylen}
                        entities={this.entities}
                    />
                </div>
                <div className="game-info">
                </div>
            </div>
        )
    }

    onKeyPressed(e) {
        let direction
        switch (e.key) {
            case 'ArrowUp':
                direction = DIRECTION.up
                break
            case 'ArrowDown':
                direction = DIRECTION.down
                break
            case 'ArrowLeft':
                direction = DIRECTION.left
                break
            case 'ArrowRight':
                direction = DIRECTION.right
                break
        }
        this.props.movePlayer(direction)
    }

    componentDidMount() {
        this.focusDiv()
    }

    componentDidUpdate() {
        if (this.state.active) {
            this.focusDiv()
        }
    }

    focusDiv() {
        ReactDOM.findDOMNode(this.refs.gameDiv).focus()
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        player: state.player
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    let player = ownProps.player

    return {
        movePlayer: direction => dispatch(movePlayer(direction, player.x, player.y)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game)
