/* tslint:disable:max-classes-per-file */
import {CSSProperties} from 'react'
import {strEnum} from './util'

export class Player implements IEntity, ICollidable {
    public x: number
    public y: number
    public width: number
    public height: number

    public onUpdate() {
        return
    }

    public onCollide(eid: string) {
        return false
    }
}

export class StaticObject implements IEntity, ICollidable {
    public x: number
    public y: number
    public width: number
    public height: number

    public onUpdate() {
        return
    }

    public onCollide(eid: string) {
        return false
    }
}

export interface IEntity {
    x: number
    y: number

    height: number
    width: number

    onUpdate: () => void
}

export interface ICollidable {
    onCollide: (eid: string) => boolean
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

export interface ITileset {
    firstgid: number,
    source: string
}

export interface ITilesetDetails {
    columns: number
    image: string
    imageheight: number
    imagewidth: number
    margin: number
    name: string
    spacing: number
    tilecount: number
    tileheight: number
    tileproperties: number
    tilewidth: number
    type: string
}

export interface IMap {
    // TODO have array of arrays of entities for layers
    entities?: IEntity[]
    gidStyles: CSSProperties[]
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

    entitiesByPosIdx: string[]
    entitiesByName: {
        [eid: string]: IEntity
    }
}
