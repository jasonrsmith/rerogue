const loadTilesetDetails = async (tileset) => {
    console.log("loading", tileset)
    const response = await fetch(tileset)
    const json = await response.json()
    console.log(json)
    return json
}

class MapLoader {
    constructor(loadMap) {
        this.loadMap = loadMap
    }

    load(mapFile) {
        let url = mapFile
        fetch(url)
            .then(res => {
                res.json().then((json) => {
                    json.layersByName = {}
                    if (!json.layers) {
                        return
                    }
                    json.layers.forEach((layer) => {
                        json.layersByName[layer['name']] = layer
                    })

                    json.gids = []
                    json.tilesets.forEach((tileset, index, array) => {
                        loadTilesetDetails(tileset).then(tilesetDetails => {
                            for (let i = 0; i < tilesetDetails.tilecount; i++) {
                                let xoff = '-' + (i % tilesetDetails.columns) + 'px'
                                let yoff = '-' + (Math.floor(i / tilesetDetails.columns)) + 'px'
                                json.gids[tileset.firstgid + i] = {
                                    background: `url('${tilesetDetails.image}' no-repeat ${xoff} ${yoff}`,
                                    width: tilesetDetails.tileWidth,
                                    height: tilesetDetails.tileHeight,
                                }
                            }
                        })

                    })
                    this.loadMap(json)
                })
            })
    }
}

export default MapLoader