import { ErrorTypes } from "../ErrorTypes";

export const LoginErrorMsgs = {
    [ErrorTypes.LOGIN_ERROR]: {
        402: 'Username is invalid',
        403: 'Password is invalid',
        404: 'Complete todos los campos',
        405: 'Los datos son incorrectos'
    }
}