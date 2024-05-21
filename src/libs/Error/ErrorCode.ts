import { ErrorsMsgs } from "./ErrorCodesMsgs"
import { ErrorTypes } from "./ErrorTypes"

export class ErrorCode {
    
    private code: number
    private type: ErrorTypes

    constructor(code: number | string = 0, type: ErrorTypes) {
        this.code = typeof(code) == 'string' ? parseInt(code as string) : code as number
        this.type = type
    }

    private isValid() {
        return this.code && this.code > 0 && ErrorsMsgs[this.type] && ErrorsMsgs[this.type][this.code]
    }

    getMessage(): string {
        if(!this.isValid()) return ''
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