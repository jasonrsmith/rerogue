import React from 'react'
import Board from './Board'
import * as ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {DIRECTION, setPlayerPosition} from '../actions/game'
import Player from './Player'

const TILE_SIZE_PX=64

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.xlen = 6
        this.ylen = 8
        this.entities = Array(this.xlen * this.ylen)
    }

    render() {
        let player = this.props.player
        let left = (window.innerWidth / 2)
            - (this.xlen * TILE_SIZE_PX / 4)
            - (player.x * (TILE_SIZE_PX)) - 1
            //- (player.x * (TILE_SIZE_PX + 1)) - 1
            + TILE_SIZE_PX;
        let top = (window.innerHeight / 2)
            - (this.ylen * TILE_SIZE_PX / 4)
            //- (player.y * (TILE_SIZE_PX + 1))
            - (player.y * (TILE_SIZE_PX))
            + 2 * TILE_SIZE_PX;
        const pStyle = {
            left: left + 'px',
            top: top + 'px',
        }

        return (
            <div className="game-container">
                <div
                    ref="gameDiv"
                    className="game"
                    onKeyDown={(e) => this.onKeyPressed(e)}
                    tabIndex="0"
                    style={pStyle}
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
                <Player/>
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
        let x = this.props.player.x
        let y = this.props.player.y
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
    /*
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    */

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
