type TObject = Record<string, string>

export class Url {

    private url: string
    private endpoint: string
    private params: TObject
    private final: string

    constructor(url: string, endPoint?: string, params: TObject = {}) {
        this.url = url
        this.endpoint = endPoint
        this.params = params
    }

    setEndPoint(endPoint:string) {
        this.endpoint = endPoint
    }

    setParams(params: TObject) {
        this.params = params
    }

    setFinal(final: string) {
        this.final = final
    }

    getFinal(): string {
        return this.final
    }

    getEndPoint(): string {
        return this.endpoint
    }

    getParams(): TObject {
        return this.params
    }

    getParam(key:string): string {
        return this.params[key]
    }

    addParams(obj: TObject) {
        for (const key in obj) {
            this.params[key] = obj[key]
        }
    }

    toString(): string {
        let urlStr = this.url
        if (this.endpoint) {
            urlStr += `/${this.endpoint}`
        }
        if (this.params) {
            urlStr += `?${this.convertToString(this.params)}`
        }
        if (this.final) {
            urlStr += this.final
        }
        return urlStr
    }

    private convertToString(obj: TObject): string {
        let urlStr = ''
        for (const key in obj) {
            const value = obj[key]
            if(value == null || value == undefined) continue
            urlStr += `${key}=${value}&`
        }
        return urlStr.slice(0, -1)
    }
}