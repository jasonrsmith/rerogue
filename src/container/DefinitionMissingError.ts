export class DefinitionMissingError extends Error {
    public definitionName: string

    constructor(definitionName: string) {
        super(`Container could not retrieve undefined definition for '${definitionName}'`)
        this.name = 'DefinitionMissing'
        this.definitionName = definitionName
    }
}