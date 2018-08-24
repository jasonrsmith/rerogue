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

export const movePlayer = (x, y) => ({
    type: 'MOVE_PLAYER',
    x: x,
    y: y,
})

/*
export const placeObjectByName = (name, x, y) => ({
    type: 'PLACE_OBJECT_BY_NAME',
    name: name,
    x: x,
    y: y,
})
*/

export const loadMap = map => ({
    type: 'LOAD_MAP',
    map: map,
})

export const loadObjects = objects => ({
    type: 'LOAD_OBJECTS',
})
