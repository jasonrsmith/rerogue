class MapLoader {
    constructor(loadMap) {
        this.loadMap = loadMap
    }

    load(mapFile) {
        let url = mapFile
        fetch(url)
            .then(res => {
                res.json().then((json) => this.loadMap(json))
            })
    }
}
export default MapLoader