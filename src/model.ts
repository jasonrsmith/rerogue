import {CSSProperties} from 'react'
import {strEnum} from './util'

export interface IEntity {
    collidable?: boolean
}

interface IObject {
    name: string

    x: number
    y: number
}

export interface ILayerProps {
    id: number
    name: string
    type: string
    height: number
    width: number
    visible: boolean
    rotation: number
    data?: number[]
    objects?: IObject[]
}

export const layerNames = strEnum([
    'background',
    'objects',
    'items',
    'npcs',
    'meta',
])

export interface ILayersDict {
    [layerName: string]: ILayerProps
}

export interface IMap {
    // TODO have array of arrays of entities for layers
    gidProperties?: IEntity[] // TODO rename gidProperties to entities
    gidStyles?: CSSProperties[] // TODO rename gidStlyes to backgroundStyles
    // TODO incorporate styles into entities
    // TODO move entities to state

    height: number
    width: number

    layersByName: ILayersDict
}

interface IPlayer {
    x: number
    y: number

    attack: number
    health: number
}

export interface IState {
    map: IMap
    objectsByPosition: object[]
    // TODO remove objectsByPosition after replacing wit entites from IMap

    // TODO convert player to entity
    player: IPlayer
}
