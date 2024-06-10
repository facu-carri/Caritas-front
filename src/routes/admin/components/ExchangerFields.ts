import { FormField } from "src/components/GenericForm"
import { ExchangerData } from "src/types/Types"

export const getAdminFields = (exchanger:ExchangerData): FormField[] => {
    return [
        { nombre: 'Nombre completo', etiqueta: 'name', value: exchanger.name, tipo: 'text' },
        { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', value: exchanger.birthdate, tipo: 'date'},
        { nombre: 'DNI', etiqueta: 'dni', value: exchanger.dni, tipo: 'text' },
        { nombre: 'Teléfono', etiqueta: 'phone', value: exchanger.phone, tipo: 'text' },
        { nombre: 'Contraseña', etiqueta: 'password', value: exchanger.password, tipo: 'password', optional: true },
        { nombre: 'Vuelva a ingresar la contraseña', etiqueta: 'password-check', value: exchanger.password, tipo: 'password' },
    ]
}

export const getExchangerFields = (exchanger:ExchangerData): FormField[] => {
    return [
        { nombre: 'Nombre completo', etiqueta: 'name', value: exchanger.name, tipo: 'text' },
        { nombre: 'DNI', etiqueta: 'dni', value: exchanger.dni, tipo: 'text' },
      ]
}