import { ErrorTypes } from "../ErrorTypes";

export const RegisterHelperErrorMsgs = {
    [ErrorTypes.REGISTER_HELPER_ERROR]: {
        400: "La contraseña debe ser alfanumérica mayor o igual a 6 dígitos",
        401: "Solo administradores pueden registrar ayudantes",
        406: "La fecha de nacimiento debe pertenecer a una persona mayor de edad",
        409: "Email ya registrado",
        451: "Email invalido"
    }
}