import {action} from 'typesafe-actions'
import {IMap} from '../model'
import {strEnum} from '../util'

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

export interface IAction<PayloadType>{
    type: string,
    payload: PayloadType,
    meta: any,
}

export const actions = strEnum([
    'SET_PLAYER_POSITION',
    'MOVE_PLAYER',
    'LOAD_MAP',
    'LOAD_OBJECTS',
])

export const setPlayerPosition = (pos: IPositionXY) => action(actions.SET_PLAYER_POSITION, pos)
export const movePlayer = (pos: IPositionXY) => action(actions.MOVE_PLAYER, pos)
export const mapLoaded = (map: IMap) => action(actions.LOAD_MAP, map)
export const loadObjects = (objects: object[]) => action(actions.LOAD_OBJECTS, objects)
