/**
 * A happy little IoC Container :)
 */
import {DefinitionMissingError} from './DefinitionMissingError'

export class Container {
    private readonly definitions: object
    private readonly shared: object

    constructor() {
        this.definitions = {}
        this.shared = {}
    }

    public share<T>(name: string, callback: (c: Container) => T) {
        this.definitions[name] = callback
    }

    public get(name: string) {
        if (!this.definitions.hasOwnProperty(name)) {
            throw new DefinitionMissingError(name)
        }
        if (!this.shared[name]) {
            this.shared[name] = this.definitions[name](this)
        }
        return this.shared[name]
    }
}
