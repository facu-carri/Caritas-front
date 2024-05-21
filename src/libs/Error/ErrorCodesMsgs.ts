import { IErrorCodesMsgs } from "./types/IErrorCodeMsgs"
import { LoginErrorMsgs } from "./ErrorMessages/Login"
import { ErrorTypes } from "./ErrorTypes"
import { RegisterHelperErrorMsgs } from "./ErrorMessages/RegisterHelper"

const DefaultErrors: IErrorCodesMsgs = {
    [ErrorTypes.UNKNOWN_ERROR]: {
        404: 'Unknown error'
    }
}

export const ErrorsMsgs = {
    ...DefaultErrors,
    ...LoginErrorMsgs,
    ...RegisterHelperErrorMsgs
}