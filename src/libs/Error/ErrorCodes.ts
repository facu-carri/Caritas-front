import { LoginErrorCodes } from "./login/LoginErrorCode";

const DefaultErrorCode = {
    UNKNOWN_ERROR: 404
}

export const ErrorCodes = {
    ...DefaultErrorCode,
    ...LoginErrorCodes
}