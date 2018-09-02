export enum Direction {
    'down',
    'up',
    'left',
    'right',
}

export const setPlayerPosition = (x: number, y: number) => ({
    type: 'SET_PLAYER_POSITION',

    x,
    y,
})

export const movePlayer = (x: number, y: number) => ({
    type: 'MOVE_PLAYER',

    x,
    y,
})

/*
export const placeObjectByName = (name, x, y) => ({
    type: 'PLACE_OBJECT_BY_NAME',
    name: name,
    x: x,
    y: y,
})
*/

export const loadMap = (map: string) => ({
    type: 'LOAD_MAP',

    map,
})

export const loadObjects = (objectsByPosition: object[]) => ({
    type: 'LOAD_OBJECTS',

    objectsByPosition,
})
