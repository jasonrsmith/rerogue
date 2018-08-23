import React from 'react'
import * as ReactDOM from 'react-dom'
import {DIRECTION} from '../actions/game'
import Player from './Player'

const TILE_SIZE_PX=64

export default (Board, mapLoader) =>
class Game extends React.Component {
    constructor(props) {
        super(props)
        mapLoader.load('dungeon-map.json')
    }

    render() {
        let height = this.props.height
        let width = this.props.width

        if (!height || !width) {
            return <div ref="gameDiv"/>
        }

        let player = this.props.player
        let left = (window.innerWidth / 2)
            - (this.props.width * TILE_SIZE_PX / 4)
            - (player.x * (TILE_SIZE_PX)) - 1
            + TILE_SIZE_PX
        let top = (window.innerHeight / 2)
            - (this.props.height * TILE_SIZE_PX / 4)
            - (player.y * (TILE_SIZE_PX))
            + 2 * TILE_SIZE_PX
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
                        <Board />
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
            default:
        }
        this.movePlayer(direction)
    }

    movePlayer(direction) {
        const x = this.props.player.x
        const y = this.props.player.y
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
