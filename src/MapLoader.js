import {convert1to2} from './coordConverter'

const loadTilesetDetails = async (tileset) => {
    const response = await fetch(tileset)
    const tilesetDetails = await response.json()
    return tilesetDetails
}

class MapLoader {
    constructor(loadMap) {
        this.loadMap = loadMap
    }

    async load(mapFile) {
        fetch(mapFile)
            .then(response => {
                response.json().then(async (map) => {
                    const layersByName = this.loadLayers(map.layers)
                    const gidStyles = await this.loadGidStyles(map.tilesets)
                    const objects = this.loadObjects(map)

                    this.loadMap({
                        ...map,
                        layersByName: layersByName,
                        gidStyles: gidStyles,
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

    async loadGidStyles(tilesets) {
        let gidStyles = []
        for (const tileset of tilesets) {
            await loadTilesetDetails(tileset.source).then(tilesetDetails => {
                for (let i = 0; i < tilesetDetails.tilecount; i++) {
                    const xy = convert1to2(i, tilesetDetails.columns)
                    const xoff = '-' +
                        xy[0] * (tilesetDetails.tilewidth + tilesetDetails.spacing) + 'px'
                    const yoff = '-' +
                        (xy[1] * (tilesetDetails.tileheight + tilesetDetails.spacing)) + 'px'

                    gidStyles[parseInt(tileset.firstgid + i, 10)] = {
                        background: `url('${tilesetDetails.image}') no-repeat ${xoff} ${yoff}`,
                        width: tilesetDetails.tilewidth,
                        height: tilesetDetails.tileheight,
                    }
                }
            })
        }
        return gidStyles
    }

    loadObjects(map) {
        for (let i=0; i < map.width * map.height; i++) {
            //if (map.layersByName['meta'])
        }
    }
}

export default MapLoader