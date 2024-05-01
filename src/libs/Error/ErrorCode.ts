import { ErrorCodes } from "./ErrorCodes"

export class ErrorCode{
    private code: number

    constructor(code: number = null) {
        this.code = code
    }

    private isValid() {
        return this.code && this.code > 0 && ErrorCodes[this.code]
    }

    getMessage(): string {
        if(!this.isValid()) return null
        return ErrorCodes[this.code].text ?? ''
    }

    getType(): string {
        if(!this.isValid()) return null
        return ErrorCodes[this.code].type ?? ''
    }

    setCode(code: number) {
        this.code = code
    }

}