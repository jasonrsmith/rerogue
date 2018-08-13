import React from 'react'
import Board from './Board'
import * as ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {DIRECTION, setPlayerPosition} from '../actions/game'

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
        this.movePlayer(direction)
    }

    movePlayer(direction) {
        let x = this.props.player.x;
        let y = this.props.player.y;
        switch (direction) {
            case DIRECTION.up:
                return this.props.setPlayerPosition(x, y-1)
            case DIRECTION.down:
                return this.props.setPlayerPosition(x, y+1)
            case DIRECTION.left:
                return this.props.setPlayerPosition(x-1, y)
            case DIRECTION.right:
                return this.props.setPlayerPosition(x+1, y)
            default:
        }
    }

    componentDidMount() {
        this.focusDiv()
    }

    componentDidUpdate() {
        this.focusDiv()
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
    return {
        setPlayerPosition: (x, y) => dispatch(setPlayerPosition(x, y)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game)
