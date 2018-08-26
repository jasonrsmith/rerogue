import {convert1to2, pixelsToCoords} from './coordConverter'

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
                    const {gidStyles, gidProperties} = await this.loadGidStylesAndProperties(map.tilesets)

                    this.loadMap({
                        ...map,
                        gidProperties: gidProperties,
                        gidStyles: gidStyles,
                        layersByName: layersByName,
                    })
                })
            })
    }

    loadLayers(layers) {
        let layersByName = {}
        for (const layer of layers) {
            layersByName[layer.name] = layer
        }
        return layersByName
    }

    async loadGidStylesAndProperties(tilesets) {
        let gidStyles = []
        let gidProperties = {}

        const loadTilesetDetails = async (tileset) => {
            const response = await fetch(tileset)
            const tilesetDetails = await response.json()
            return tilesetDetails
        }

        const onLoadTilesetDetails = (firstgid) => {
            return (tilesetDetails) => {
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
            gidProperties: gidProperties,
            gidStyles: gidStyles,
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