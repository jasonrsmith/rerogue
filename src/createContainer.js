import {connect} from 'react-redux'
import Container from './Container'
import Game from './components/Game'
import {loadMap, setPlayerPosition} from './actions/game'
import Board from './components/Board'
import Tile from './components/Tile'
import MapLoader from './MapLoader'
import {convert2to1} from './coordConverter'

const getStyleForGid = (gid, state) => {
    return state.map.gidStyles[gid]
}

export default (store) => {
    let c = new Container()
    c.share('Game', (c) => connect(
        state => {
            const props = { player: state.player }
            if (state.map) {
                return { ...props, width: state.map.width, height: state.map.height }
            }
            return props
        },
        dispatch => ({
            setPlayerPosition: (x, y) => dispatch(setPlayerPosition(x, y)),
        })
    )(Game(c.get('Board'), c.get('MapLoader'))))

    c.share('Board', (c) => connect(
        state => {
            if (state.map) {
                return { width: state.map.width, height: state.map.height }
            }
            else {
                return {}
            }
        }
    )(Board(c.get('Tile'))))
    c.share('Tile', () => connect(
        (state, props) => {
            if (!state.map) {
                return {}
            }
            return {
                backgroundGid: state.map.layersByName.background.data[convert2to1(props.x, props.y, state.map.width)]
            }
        }
    )(Tile((gid) => getStyleForGid(gid, store.getState()))))
    c.share('MapLoader', () => new MapLoader(
        (map) => store.dispatch(loadMap(map)),
        (x, y) => store.dispatch(setPlayerPosition(x, y)),
    ))
    return c
}

