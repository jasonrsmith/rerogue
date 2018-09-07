import {action} from 'typesafe-actions'
import {IMap} from './model'
import {strEnum} from './util'

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
    'INIT',
    'LOAD_MAP',
    'LOAD_OBJECTS',
    'MAP_LOADED',
    'MOVE_PLAYER',
    'SET_PLAYER_POSITION',
])

export const loadMap = (mapName: string) => action(actions.LOAD_MAP, mapName)
export const loadObjects = (objects: object[]) => action(actions.LOAD_OBJECTS, objects)
export const mapLoaded = (map: IMap) => action(actions.MAP_LOADED, map)
export const movePlayer = (pos: IPositionXY) => action(actions.MOVE_PLAYER, pos)
export const setPlayerPosition = (pos: IPositionXY) => action(actions.SET_PLAYER_POSITION, pos)
export const init = () => action(actions.INIT)
