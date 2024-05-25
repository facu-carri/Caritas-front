import { ErrorTypes } from "../ErrorTypes";

export const LoginErrorMsgs = {
    [ErrorTypes.LOGIN_ERROR]: {
        404: 'Username is invalid',
        403: 'Password is invalid'   
    }
}