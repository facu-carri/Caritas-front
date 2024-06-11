import { FormField } from "src/components/GenericForm"
import { HelperData } from "src/types/Types"

export const getAdminFields = (helper:HelperData): FormField[] => {
    return [
        { nombre: 'Foto', etiqueta: 'photo', tipo: 'file'},
        { nombre: 'Nombre completo', etiqueta: 'name', value: helper.name, tipo: 'text' },
        { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', value: helper.birthdate, tipo: 'date'},
        { nombre: 'DNI', etiqueta: 'dni', value: helper.dni, tipo: 'text' },
        { nombre: 'Teléfono', etiqueta: 'phone', value: helper.phone, tipo: 'text' },
        { nombre: 'Contraseña', etiqueta: 'password', value: helper.password, tipo: 'password', optional: true },
        { nombre: 'Vuelva a ingresar la contraseña', etiqueta: 'password-check', value: helper.password, tipo: 'password' },
    ]
}