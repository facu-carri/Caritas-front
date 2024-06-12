import { ErrorTypes } from "../ErrorTypes";

export const EditProfileErrorMsgs = {
    [ErrorTypes.EDIT_PROFILE_ERROR]: {
        400: 'La contraseña debe ser alfanumérica mayor o igual a 6 dígitos',
        401: 'Acceso no autorizado',
        404: 'No existe el intercambiador',
        406: 'La fecha de nacimiento debe pertenecer a una persona mayor de edad',
    }
}