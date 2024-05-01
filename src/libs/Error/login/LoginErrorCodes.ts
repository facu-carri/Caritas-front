import { IErrorCodes } from "../IErrorCode";
import { LoginErrorTypes } from "./LoginErrorTypes";

export const LoginErrorCodes: IErrorCodes = {
    10: {
        type: LoginErrorTypes.USERNAME_ERROR,
        text: 'Username is invalid',
    },
    11: {
        type: LoginErrorTypes.PASSWORD_ERROR,
        text: 'Password is invalid'
    }
}