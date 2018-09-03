import {IPositionXY} from './actions/game'
import {convert1to2} from './coordConverter'

import {CSSProperties} from 'react'

export interface IMapLoader {
    load(mapFile: string): void
}

export const createMapLoader = (
    loadMap: (map: any) => void,
    setPlayerPosition: (pos: IPositionXY) => void,
) =>
    class MapLoader implements IMapLoader {
        public async load(mapFile: string) {
            fetch(mapFile)
                .then(response => {
                    response.json().then(async (map) => {
                        const layersByName = this.loadLayers(map.layers)
                        const {gidStyles, gidProperties} = await this.loadGidStylesAndProperties(map.tilesets)
                        loadMap({
                            ...map,
                            gidProperties,
                            gidStyles,
                            layersByName,
                        })
                    })
                })
        }

        private loadLayers(layers: any) {
            const layersByName = {}
            for (const layer of layers) {
                layersByName[layer.name] = layer
            }
            return layersByName
        }

        private async loadGidStylesAndProperties(tilesets: any) {
            const gidStyles: CSSProperties[] = []
            const gidProperties = {}

            const loadTilesetDetails = async (tileset: any) => {
                const response = await fetch(tileset)
                const tilesetDetails = await response.json()
                return tilesetDetails
            }

            const onLoadTilesetDetails = (firstgid: number) => {
                return (tilesetDetails: any) => {
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
                            gidProperties[parseInt(tilesetGid, 10) + firstgid] = properties
                        }
                    }
                }
            }

            for (const tileset of tilesets) {
                await loadTilesetDetails(tileset.source).then(onLoadTilesetDetails(tileset.firstgid))
            }

            return {
                gidProperties,
                gidStyles,
            }
        }

        // public loadObjects(objects: any) {
        //     for (const object of objects) {
        //         const xy = pixelsToCoords(object.x, object.y)
        //         if (object.name === 'playerSpawnPoint') {
        //             setPlayerPosition({x: xy[0], y: xy[1]})
        //         }
        //     }
        //
        //     /*
        //     for (let i=0; i < map.width * map.height; i++) {
        //         //if (map.layersByName['objects'])
        //     }
        //     */
        // }
    }
