import {action} from 'typesafe-actions'
import {IMap} from './model'
import {strEnum} from './util'

export enum Direction {
    down = 'down',
    up = 'up',
    left = 'left',
    right = 'right',
}

export interface IPositionXY {
    x: number
    y: number
}

export interface IAction<PayloadType> {
    type: string,
    payload: PayloadType,
    meta: any,
}

export const createAction = (actionName: string, payload: any = undefined) => {
    const a = action(actionName, payload)
    return {
        meta: null,
        payload: null,
        ...a,
    }
}

export const actions = strEnum([
    'INIT',
    'LOAD_MAP',
    'LOAD_OBJECTS',
    'MAP_LOADED',
    'MOVE_PLAYER',
    'SET_PLAYER_POSITION',
    'MOVEMENT_INPUT_RECEIVED',
    'TICK',
])

export const loadMap = (mapName: string) => createAction(actions.LOAD_MAP, mapName)
export const loadObjects = (objects: object[]) => createAction(actions.LOAD_OBJECTS, objects)
export const mapLoaded = (map: IMap) => createAction(actions.MAP_LOADED, map)
export const movePlayer = (pos: IPositionXY) => createAction(actions.MOVE_PLAYER, pos)
export const setPlayerPosition = (pos: IPositionXY) => createAction(actions.SET_PLAYER_POSITION, pos)
export const init = () => createAction(actions.INIT)
export const movementInputReceived = (direction: Direction) => createAction(actions.MOVEMENT_INPUT_RECEIVED, direction)
export const tick = () => createAction(actions.TICK)
