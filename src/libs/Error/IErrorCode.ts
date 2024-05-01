export type IErrorCode = {
    type: string,
    text: string
}

export type IErrorCodes = {
    [x: number]: IErrorCode
}