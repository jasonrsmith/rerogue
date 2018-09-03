import * as React from 'react'
import {TILE_SIZE_PX} from '../coordConverter'
import {IMapLoader} from '../MapLoader'
import {IBoardComponentProps} from './Board'
import {Player} from './Player'

export interface IGameComponentProps {
    height: number
    width: number
    player: any
}

export const createGameComponent = (
    Board: React.ComponentType<IBoardComponentProps>,
    mapLoader: IMapLoader,
) =>
    class Game extends React.Component<IGameComponentProps> {
        constructor(props: IGameComponentProps) {
            super(props)
            mapLoader.load('dungeon-map.json')
        }

        public render() {
            const height = this.props.height
            const width = this.props.width

            if (!height || !width) {
                return <div/>
            }

            const player = this.props.player

            const left = (window.innerWidth / 2)
                - (TILE_SIZE_PX / 2)
                - (player.x * (TILE_SIZE_PX)) - 1
            const top = (window.innerHeight / 2)
                - (player.y * (TILE_SIZE_PX))
            const pStyle = {
                left: left + 'px',
                top: top + 'px',
            }

            return (
                <div className="game-container"
                    /*                     tabIndex="0"
                    /!*                     ref=""*!/
                    /!*                     onKeyDown={(e) => this.onKeyPressed(e)}*!/*/
                >
                    <div
                        className="camera"
                        style={pStyle}
                    >
                        <div
                            className="game-board"
                        >
                            <Board height={this.props.height} width={this.props.width}/>
                        </div>
                        <div className="game-info"/>
                    </div>
                    <Player/>
                </div>
            )
        }
    }

/*        onKeyPressed(e) {
            let direction
            switch (e.key) {
                case 'ArrowUp':
                    direction = Direction.up
                    break
                case 'ArrowDown':
                    direction = Direction.down
                    break
                case 'ArrowLeft':
                    direction = Direction.left
                    break
                case 'ArrowRight':
                    direction = Direction.right
                    break
                default:
            }
            this.movePlayer(direction)
        }

        movePlayer(direction) {
            const x = this.props.player.x
            const y = this.props.player.y
            switch (direction) {
                case Direction.up:
                    return this.props.setPlayerPosition(x, y - 1)
                case Direction.down:
                    return this.props.setPlayerPosition(x, y + 1)
                case Direction.left:
                    return this.props.setPlayerPosition(x - 1, y)
                case Direction.right:
                    return this.props.setPlayerPosition(x + 1, y)
                default:
            }
        }*/
/*

        componentDidMount() {
            //this.focusDiv()
        }

        componentDidUpdate() {
            //this.focusDiv()
        }
*/

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

/*        focusDiv() {
            const container = ReactDOM.findDOMNode(this.refs.container)
            if (container) {
                container.focus()
            }
        }*/
