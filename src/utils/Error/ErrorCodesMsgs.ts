import { IErrorCodesMsgs } from "../../types/IErrorCodeMsgs"
import { LoginErrorMsgs } from "./ErrorMessages/Login"
import { ErrorTypes } from "./ErrorTypes"
import { RegisterHelperErrorMsgs } from "./ErrorMessages/RegisterHelper"
import { RegisterExchangerErrorMsgs } from "./ErrorMessages/RegisterExchanger"
import { FilialesErrorMsgs } from "./ErrorMessages/Filiales"
import { ExchangerErrorMsgs } from "./ErrorMessages/Exchanger"
import { EditItemErrorMsgs } from "./ErrorMessages/EditItem"
import { EditProfileErrorMsgs } from "./ErrorMessages/EditProfile"
import { AuthCodeErrorMsgs } from "./ErrorMessages/Auth"
import { EndDayErrorMsgs } from "./ErrorMessages/EndDay"

const DefaultErrors: IErrorCodesMsgs = {
    [ErrorTypes.UNKNOWN_ERROR]: {
        404: 'Error desconocido'
    }
}

export const ErrorsMsgs = {
    ...DefaultErrors,
    ...LoginErrorMsgs,
    ...RegisterHelperErrorMsgs,
    ...RegisterExchangerErrorMsgs,
    ...FilialesErrorMsgs,
    ...ExchangerErrorMsgs,
    ...EditItemErrorMsgs,
    ...EditProfileErrorMsgs,
    ...AuthCodeErrorMsgs,
    ...EndDayErrorMsgs,
}