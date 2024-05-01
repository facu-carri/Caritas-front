import { LoginErrorTypes } from "./login/LoginErrorTypes";

const DefaultErrorCodeTypes = {
    UNKNOWN_ERROR: 'unknown'
}

export const ErrorCodeTypes = {
    ...DefaultErrorCodeTypes,
    ...LoginErrorTypes
}