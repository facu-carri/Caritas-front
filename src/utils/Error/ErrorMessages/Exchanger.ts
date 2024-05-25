import { ErrorTypes } from "../ErrorTypes";

export const ExchangerErrorMsgs = {
    [ErrorTypes.EXCHANGER_ERROR]: {
        400: 'No hay intercambiadores que cumplan con el filtro',
        401: 'Acceso invalido',
        404: 'No hay usuarios cargados',
    }
}