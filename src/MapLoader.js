const loadTilesetDetails = async (tileset) => {
    const response = await fetch(tileset)
    const json = await response.json()
    return json
}

class MapLoader {
    constructor(loadMap) {
        this.loadMap = loadMap
    }

    async load(mapFile) {
        fetch(mapFile)
            .then(res => {
                res.json().then(async (json) => {
                    json.layersByName = {}
                    if (!json.layers) {
                        return
                    }
                    json.layers.forEach((layer) => {
                        json.layersByName[layer['name']] = layer
                    })

                    json.gids = []
                    for (const tileset of json.tilesets) {
                        await loadTilesetDetails(tileset.source).then(tilesetDetails => {
                            for (let i = 0; i < tilesetDetails.tilecount; i++) {
                                let xoff = '-' + (i % tilesetDetails.columns) * tilesetDetails.tilewidth + 'px'
                                let yoff = '-' + (Math.floor(i / tilesetDetails.columns) * tilesetDetails.tileheight) + 'px'
                                json.gids[parseInt(tileset.firstgid + i)] = {
                                    background: `url('${tilesetDetails.image}') no-repeat ${xoff} ${yoff}`,
                                    width: tilesetDetails.tilewidth,
                                    height: tilesetDetails.tileheight,
                                }
                            }
                        })
                    }
                    this.loadMap(json)
                })
            })
    }
}

export default MapLoader