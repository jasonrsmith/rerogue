const initialState = {
    player: {
        x: 0,
        y: 0,
        health: 1,
        attack: 1,
    },
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYER_POSITION':
            state = Object.assign({}, state, {
                ...state,
                player: {
                    ...state.player,
                    x: action.x,
                    y: action.y,
                },
            })
        case 'LOAD_MAP':
            state = Object.assign({}, state, {
                ...state,
                map: action.map
            })
        default:
    }
    console.log("action:", action)
    console.log("newstate:", state)
    return state
}

export default game
