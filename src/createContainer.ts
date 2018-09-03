import {connect} from 'react-redux'
import {Store} from 'redux'
import {IPositionXY, loadMap, setPlayerPosition} from './actions/game'
import {createBoardComponent} from './components/Board'
import {createGameComponent} from './components/Game'
import {createTileComponent, ITileComponentProps} from './components/Tile'
import {Container} from './Container'
import {convert2to1} from './coordConverter'
import {createMapLoader} from './MapLoader'

const getStyleForGid = (gid: number, state: any) => {
    return state.map.gidStyles[gid]
}

export default (store: Store) => {
    const container = new Container()

    container.share('Game', (c: Container) => connect(
        (state: any) => {
            const props = {player: state.player}
            if (state.map) {
                return {...props, width: state.map.width, height: state.map.height}
            }
            return props
        },
        dispatch => ({
            setPlayerPosition: (x: number, y: number) => dispatch(setPlayerPosition({x, y})),
        }),
    )(createGameComponent(c.get('Board'), c.get('MapLoader'))))

    container.share('Board', (c: Container) => connect(
        (state: any) => {
            if (state.map) {
                return {width: state.map.width, height: state.map.height}
            }
            else {
                return {}
            }
        },
    )(createBoardComponent(c.get('Tile'))))

    container.share('Tile', () => connect(
        (state: any, props: ITileComponentProps) => {
            if (!state.map) {
                return {}
            }
            return {
                backgroundGid: state.map.layersByName.background.data[convert2to1(props.x, props.y, state.map.width)],
            }
        },
    )(createTileComponent((gid) => getStyleForGid(gid, store.getState()))))

    container.share('MapLoader', () => new (createMapLoader(
        (map: any) => store.dispatch(loadMap(map)),
        (pos: IPositionXY) => store.dispatch(setPlayerPosition(pos)),
    )))

    // container.share(MovementInput.name, () => connect(
    // )(MovementInput((charController: CharacterController) => container.get(''))))

    return container
}

