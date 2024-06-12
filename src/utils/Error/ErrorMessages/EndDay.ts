import { ErrorTypes } from "../ErrorTypes";

export const EndDayErrorMsgs = {
    [ErrorTypes.END_DAY_ERROR]: {
        401: 'Acceso no autorizado',
        409: 'El dia de hoy ya fue cerrado',
    }
}