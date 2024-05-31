import { ErrorTypes } from "../ErrorTypes";

export const RegisterExchangerErrorMsgs = {
    [ErrorTypes.REGISTER_EXCHANGER_ERROR]: {
        400: 'La contraseña debe ser alfanumérica con una longitud mayor o igual a 6 caracteres',
        403: 'Todos los campos son obligatorios',
        406: 'La persona debe ser mayor de edad',
        409: 'Email ya registrado',
        // TODO: cambiar status code correspondiente
        //: 'El email pertenece a una cuenta suspendida por infligir las normas de la comunidad' 
    }
}