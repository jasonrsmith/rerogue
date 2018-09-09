import {convert1to2} from './coordConverter'

import {CSSProperties} from 'react'
import {IEntity, ILayerProps, IMap, ITileset, ITilesetDetails} from './model'

export async function fetchMap(mapFile: string): Promise<IMap> {
    const response = await fetch(mapFile)
    const map = await response.json()
    const layersByName = loadLayers(map.layers)
    const {entities, gidStyles} = await loadGidStylesAndProperties(map.tilesets)
    return {
        ...map,
        entities,
        gidStyles,
        layersByName,
    }
}

function loadLayers(layers: ILayerProps[]) {
    const layersByName = {}
    for (const layer of layers) {
        layersByName[layer.name] = layer
    }
    return layersByName
}

async function loadGidStylesAndProperties(tilesets: ITileset[]): Promise<{entities: IEntity[], gidStyles: CSSProperties[]}> {
    const gidStyles: CSSProperties[] = []
    const entities: IEntity[] = []

    const loadTilesetDetails = async (tilesetSource: string) => {
        const response = await fetch(tilesetSource)
        const tilesetDetails = await response.json()
        return tilesetDetails
    }

    const onLoadTilesetDetails = (firstgid: number) => {
        return (tilesetDetails: ITilesetDetails) => {
            for (let i = 0; i < tilesetDetails.tilecount; i++) {
                const xy = convert1to2(i, tilesetDetails.columns)
                const xoff = '-' + xy[0] * (tilesetDetails.tilewidth + tilesetDetails.spacing) + 'px'
                const yoff = '-' + (xy[1] * (tilesetDetails.tileheight + tilesetDetails.spacing)) + 'px'

                gidStyles[firstgid + i] = {
                    background: `url('${tilesetDetails.image}') no-repeat ${xoff} ${yoff}`,
                    height: tilesetDetails.tileheight,
                    width: tilesetDetails.tilewidth,
                }
            }

            if (tilesetDetails.hasOwnProperty('tileproperties')) {
                for (const [tilesetGid, properties] of Object.entries(tilesetDetails.tileproperties)) {
                    entities[parseInt(tilesetGid, 10) + firstgid] = properties
                }
            }
        }
    }

    for (const tileset of tilesets) {
        await loadTilesetDetails(tileset.source).then(onLoadTilesetDetails(tileset.firstgid))
    }

    return {
        entities,
        gidStyles,
    }
}
