import {connect} from 'react-redux'
import {Store} from 'redux'
import {Direction, movementInputReceived} from './actions'
import {Board, IBoardComponentProps} from './components/Board'
import {createGameComponent, IGameComponentProps} from './components/Game'
import {MovementInput} from './components/MovementInput'
import {Container} from './container/Container'
import {IState} from './model'

const getStyleForGid = (state: IState, gid: number) => {
    return state.map.gidStyles[gid]
}

export default (store: Store) => {
    const container = new Container()

    container.share('Game', (c: Container) => connect<IGameComponentProps>(
        (state: IState) => {
            const props = {player: state.player}
            if (state.map) {
                return {...props, width: state.map.width, height: state.map.height}
            }
            return props
        },
    )(createGameComponent(c.get('Board'), c.get('MovementInput'))))

    container.share('Board', (c: Container) => connect<IBoardComponentProps>(
        (state: IState) => {
            return {
                getStyleForPos: (pos: number) => {
                    if (state.map.layersByName.background.data) {
                        const gid = state.map.layersByName.background.data[pos]
                        return getStyleForGid(state, gid)
                    }
                    return {}
                },
                height: state.map.height,
                width: state.map.width,
            }
        },
    )(Board))

    container.share('MovementInput', (c) => connect(
        null,
        {
             dispatchMovementInputReceived: (direction: Direction) => store.dispatch(movementInputReceived(direction)),
        },
    )(MovementInput))


    return container
}

