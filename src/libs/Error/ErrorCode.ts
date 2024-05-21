import { ErrorsMsgs } from "./ErrorCodesMsgs"

export class ErrorCode {
    
    private code: number

    constructor(code: number = null) {
        this.code = code
    }

    private isValid() {
        return this.code && this.code > 0 && ErrorsMsgs[this.code]
    }

    getMessage(): string {
        if(!this.isValid()) return null
        return ErrorsMsgs[this.code].text ?? ''
    }

    getCode(): number {
        if(!this.isValid()) return null
        return this.code
    }

    setCode(code: number) {
        this.code = code
    }

}