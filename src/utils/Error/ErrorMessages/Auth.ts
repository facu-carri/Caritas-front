import { ErrorTypes } from "../ErrorTypes";

export const AuthCodeErrorMsgs = {
    [ErrorTypes.AUTH_CODE_ERROR]: {
        400: 'El código de autenticación debe tener 6 dígitos',
        401: 'Código incorrecto',
    }
}