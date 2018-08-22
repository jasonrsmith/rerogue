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

export const loadMapFile = name => ({
    type: 'LOAD_MAP_FILE',
    mapFile: name
})

export const loadMap = map => ({
    type: 'LOAD_MAP',
    map: map
})



