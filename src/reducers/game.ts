import {IAction} from '../actions/game'

const initialState = {
    player: {
        x: 0,
        y: 0,

        attack: 1,
        health: 1,
    },
}

const game = (state: any = initialState, action: IAction) => {
    console.log('action:', action)
    console.log('beforestate:', state)
    switch (action.type) {
        case 'MOVE_PLAYER':
            state = {
                ...state,
                player: {
                    ...state.player,
                    x: action.payload.x,
                    y: action.payload.y,
                },
            }
            break
        case 'LOAD_MAP':
            state = {
                ...state,
                map: action.payload,
            }
            break
        case 'LOAD_OBJECTS':
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
