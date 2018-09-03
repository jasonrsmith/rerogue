import {action} from 'typesafe-actions'

export enum Direction {
    'down',
    'up',
    'left',
    'right',
}

export interface IPositionXY {
    x: number
    y: number
}

export const actions = strEnum([
    'SET_PLAYER_POSITION',
    'MOVE_PLAYER',
    'LOAD_MAP',
    'LOAD_OBJECTS',
])

export const setPlayerPosition = (pos: IPositionXY) => action(actions.SET_PLAYER_POSITION, pos)
export const movePlayer = (pos: IPositionXY) => action(actions.MOVE_PLAYER, pos)
export const loadMap = (map: any) => action(actions.LOAD_MAP, map)
export const loadObjects = (objects: object[]) => action(actions.LOAD_OBJECTS, objects)

function strEnum<T extends string>(o: T[]): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key
        return res
    }, Object.create(null))
}
