import { ErrorCodeTypes } from "./ErrorCodeTypes"
import { IErrorCodes } from "./IErrorCode"
import { LoginErrorCodes } from "./login/LoginErrorCodes"

const DefaultErrorCodes: IErrorCodes = {
    0: {
        type: ErrorCodeTypes.UNKNOWN_ERROR,
        text: ''
    }
}

export const ErrorCodes = {
    ...DefaultErrorCodes,
    ...LoginErrorCodes
}