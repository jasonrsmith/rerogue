import * as React from 'react'
import {connect} from 'react-redux'
import {Store} from 'redux'
import {IPositionXY, mapLoaded, setPlayerPosition} from './actions/game'
import {createBoardComponent, IBoardComponentProps} from './components/Board'
import {createGameComponent, IGameComponentProps} from './components/Game'
import {createTileComponent, ITileComponentProps} from './components/Tile'
import {Container} from './container/Container'
import {convert2to1} from './coordConverter'
import {createMapLoader} from './MapLoader'
import {IMap, IState} from './model'

const getStyleForGid = (gid: number, state: IState) => {
    return state.gidStyles[gid]
}

export default (store: Store) => {
    const container = new Container()

    container.share<React.ComponentType<IGameComponentProps>>('Game', (c: Container) => connect(
        (state: IState) => {
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

    container.share<React.ComponentType<IBoardComponentProps>>('Board', (c: Container) => connect(
        (state: IState) => {
            if (state.map) {
                return {width: state.map.width, height: state.map.height}
            }
            else {
                return {}
            }
        },
    )(createBoardComponent(c.get('Tile'))))

    container.share('Tile', () => connect(
        (state: IState, props: ITileComponentProps) => {
            if (!state.map.layersByName.background.data) {
                return {}
            }
            return {
                backgroundGid: state.map.layersByName.background.data[convert2to1(props.x, props.y, state.map.width)],
            }
        },
    )(createTileComponent((gid) => getStyleForGid(gid, store.getState()))))

    container.share('MapLoader', () => new (createMapLoader(
        (map: IMap) => store.dispatch(mapLoaded(map)),
        (pos: IPositionXY) => store.dispatch(setPlayerPosition(pos)),
    )))

    // container.share(MovementInput.name, () => connect(
    // )(MovementInput((charController: CharacterController) => container.get(''))))

    return container
}

