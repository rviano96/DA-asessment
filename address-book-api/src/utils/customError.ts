export default class CustomError extends Error {
    constructor(msg: string, name: string) {
        super(msg)
        this.name = name
    }
}