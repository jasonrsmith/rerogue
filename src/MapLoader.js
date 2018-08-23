import {convert1to2, pixelsToCoords} from './coordConverter'

const loadTilesetDetails = async (tileset) => {
    const response = await fetch(tileset)
    const tilesetDetails = await response.json()
    return tilesetDetails
}

class MapLoader {
    constructor(loadMap, setPlayerPosition) {
        this.loadMap = loadMap
        this.setPlayerPosition = setPlayerPosition
    }

    async load(mapFile) {
        fetch(mapFile)
            .then(response => {
                response.json().then(async (map) => {
                    const layersByName = this.loadLayers(map.layers)
                    const gids = await this.loadGidStylesAndProperties(map.tilesets)
                    const objects = this.loadObjects(layersByName['objects'].objects)

                    this.loadMap({
                        ...map,
                        layersByName: layersByName,
                        gidStyles: gids.gidStyles,
                        gidProperties: gids.gidProperties,
                        objects: objects
                    })
                })
            })
    }

    loadLayers(layers) {
        let layersByName = {}
        for (const layer of layers) {
            layersByName[layer['name']] = layer
        }
        return layersByName
    }

    async loadGidStylesAndProperties(tilesets) {
        let gidStyles = []
        let gidProperties = {}

        const onLoadTilesetDetails = (firstgid) => {
            return (tilesetDetails) => {
                for (let i = 0; i < tilesetDetails.tilecount; i++) {
                    const xy = convert1to2(i, tilesetDetails.columns)
                    const xoff = '-' + xy[0] * (tilesetDetails.tilewidth + tilesetDetails.spacing) + 'px'
                    const yoff = '-' + (xy[1] * (tilesetDetails.tileheight + tilesetDetails.spacing)) + 'px'

                    gidStyles[firstgid + i] = {
                        background: `url('${tilesetDetails.image}') no-repeat ${xoff} ${yoff}`,
                        width: tilesetDetails.tilewidth,
                        height: tilesetDetails.tileheight,
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
            gidStyles: gidStyles,
            gidProperties: gidProperties
        }
    }

    loadObjects(objects) {
        for (const object of objects) {
            const xy = pixelsToCoords(object.x, object.y)
            if (object.name === 'playerSpawnPoint') {
                this.setPlayerPosition(xy[0], xy[1])
            }
        }

        /*
        for (let i=0; i < map.width * map.height; i++) {
            //if (map.layersByName['objects'])
        }
        */
    }
}

export default MapLoader