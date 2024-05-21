import { ErrorsMsgs } from "./ErrorCodesMsgs"

export class ErrorCode {
    
    private code: number
    private type: string

    constructor(code: number = null, type: string) {
        this.code = code
        this.type = type
    }

    private isValid() {
        return this.code && this.code > 0 && this.type
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