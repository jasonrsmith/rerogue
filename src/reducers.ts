import {actions, IAction} from './actions'
import {IState} from './model'

const initialState = {
    map: {
        height: 0,
        width: 0,

        // TODO remove this
        gidStyles: [],
        layersByName: {},
    },
    objectsByPosition: [],
    player: {
        x: 0,
        y: 0,

        attack: 1,
        health: 1,
    },

    entitiesByName: {},
    entitiesByPosIdx: []
}

export const reducers = (state: IState = initialState, action: IAction<any>) => {
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
        case actions.MAP_LOADED:
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
    console.log(action, 'newstate:', state)
    return state
}
