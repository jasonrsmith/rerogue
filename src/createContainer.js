import {connect} from 'react-redux'
import Container from './Container'
import Game from './components/Game'
import {setPlayerPosition} from './actions/game'
import Board from './components/Board'
import Tile from './components/Tile'

export default () => {
    let c = new Container()
    let xlen=6
    let ylen=8
    c.share('Game', (c) => connect(
        state => ({ player: state.player }),
        dispatch => ({
            setPlayerPosition: (x, y) => dispatch(setPlayerPosition(x, y)),
        })
    )(Game(xlen, ylen, c.get('Board'))));

    c.share('Board', (c) => Board(xlen, ylen, c.get('Tile')))
    c.share('Tile', (c) => new Tile())

    return c
}