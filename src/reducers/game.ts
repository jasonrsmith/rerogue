import {actions, IAction} from '../actions/game'
import {IState} from '../model'

const initialState = {
    map: {
        height: 0,
        width: 0,

        // TODO remove this
        layersByName: {},
    },
    objectsByPosition: [],
    player: {
        x: 0,
        y: 0,

        attack: 1,
        health: 1,
    },

}

const game = (state: IState = initialState, action: IAction<any>) => {
    console.log('action:', action)
    console.log('beforestate:', state)
    switch (action.type) {
        case actions.MOVE_PLAYER:
            state = {
                ...state,
                player: {
                    ...state.player,
                    x: action.payload.x,
                    y: action.payload.y,
                },
            }
            break
        case actions.LOAD_MAP:
            state = {
                ...state,
                map: action.payload,
            }
            break
        case actions.LOAD_OBJECTS:
            state = {
                ...state,
                objectsByPosition: action.payload,
            }
            break
        default:
    }
    console.log('newstate:', state)
    return state
}

export default game
