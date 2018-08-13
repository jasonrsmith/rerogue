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
            return Object.assign({}, state, {
                player: {
                    ...state.player,
                    x: action.x,
                    y: action.y,
                },
            })
        default:
            return state
    }
}

export default game
