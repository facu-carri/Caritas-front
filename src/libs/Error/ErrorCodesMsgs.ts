import { IErrorCodesMsgs } from "./types/IErrorCodeMsgs"
import { LoginErrorMsgs } from "./login/LoginErrorCode"

const DefaultErrors: IErrorCodesMsgs = {
    404: 'Unknown error'
}

export const ErrorsMsgs = {
    ...DefaultErrors,
    ...LoginErrorMsgs
}