export const DIRECTION = {
    'up': 0,
    'down': 1,
    'left': 2,
    'right': 3,
}

export const setPlayerPosition = (x, y) => ({
    type: 'SET_PLAYER_POSITION',
    x: x,
    y: y,
})

export const movePlayer = (direction, x, y) => {
    setPlayerPosition()
    switch (direction) {
        case DIRECTION.up:
            return setPlayerPosition(x, y-1)
        case DIRECTION.down:
            return setPlayerPosition(x, y+1)
        case DIRECTION.left:
            return setPlayerPosition(x-1, y)
        case DIRECTION.right:
            return setPlayerPosition(x+1, y)
        default:
            return {}
    }
}