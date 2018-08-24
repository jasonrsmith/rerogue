const initialState = {
    player: {
        x: 0,
        y: 0,
        health: 1,
        attack: 1,
    },
}

const game = (state = initialState, action) => {
    console.log("action:", action)
    console.log("beforestate:", state)
    switch (action.type) {
        case 'MOVE_PLAYER':
            state = {
                ...state,
                player: {
                    ...state.player,
                    x: action.x,
                    y: action.y,
                },
            }
            break
        case 'LOAD_MAP':
            state = {
                ...state,
                map: action.map
            }
            break
        case 'LOAD_OBJECTS':
            state = {
                ...state,
                objectsByPosition: action.objectsByPosition
            }
            break
        default:
    }
    console.log("newstate:", state)
    return state
}

export default game
