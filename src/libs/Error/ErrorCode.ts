import { ErrorsMsgs } from "./ErrorCodesMsgs"
import { ErrorTypes } from "./ErrorTypes"

export class ErrorCode {
    
    private code: number
    private type: ErrorTypes

    constructor(code: number = null, type: ErrorTypes) {
        this.code = code
        this.type = type
    }

    private isValid() {
        return this.code && this.code > 0
    }

    getMessage(): string {
        if(!this.isValid()) return null
        return ErrorsMsgs[this.type][this.code] ?? ''
    }

    getCode(): number {
        if(!this.isValid()) return null
        return this.code
    }

    setCode(code: number) {
        this.code = code
    }
}