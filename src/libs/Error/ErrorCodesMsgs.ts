import { IErrorCodesMsgs } from "./types/IErrorCodeMsgs"
import { LoginErrorMsgs } from "./login/LoginErrorCode"

const DefaultErrors: IErrorCodesMsgs = {
    UNKNOWN_ERROR: {
        404: 'Unknown error'
    }
}

export const ErrorsMsgs = {
    ...DefaultErrors,
    ...LoginErrorMsgs
}