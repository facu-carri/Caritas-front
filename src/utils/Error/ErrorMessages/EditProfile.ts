import { ErrorTypes } from "../ErrorTypes";

export const EditProfileErrorMsgs = {
    [ErrorTypes.EDIT_PROFILE_ERROR]: {
        400: 'Contraseña inválida',
        401: 'Acceso no autorizado',
        404: 'No existe el intercambiador',
        406: 'Fecha de nacimiento debe ser mayor a 18 años',
    }
}