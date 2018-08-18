class Container {
    constructor() {
        this.definitions = {}
        this.shared = {}
    }

    share(name, callback) {
        this.definitions[name] = callback
    }

    get(name) {
        if (!this.definitions.hasOwnProperty(name)) {
            let e = Error(`Container could not retrieve undefined definition for '${name}'`)
            e.name = 'DefinitionMissing'
            e.definitionName = name
            throw e
        }
        if (!this.shared[name]) {
            this.shared[name] = this.definitions[name](this)
        }
        return this.shared[name]
    }
}

export default Container