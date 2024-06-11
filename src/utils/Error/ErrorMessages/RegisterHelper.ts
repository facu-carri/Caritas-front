import { ErrorTypes } from "../ErrorTypes";

export const RegisterHelperErrorMsgs = {
    [ErrorTypes.REGISTER_HELPER_ERROR]: {
        400: "Contraseña invalida",
        401: "Solo administradores pueden registrar ayudantes",
        406: "La fecha es de un menor de edad",
        409: "Email ya registrado",
        451: "Email invalido"
    }
}