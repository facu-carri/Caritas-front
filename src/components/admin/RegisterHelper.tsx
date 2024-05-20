/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/libs/constants";

// Componente de Registro de Ayudante
export default function RegisterHelper({ modalId }) {

  const handleRegister = (data: Record<string, any>) => {
    console.log(data)
    postData(endPoints.registerHelper, null, data)
  }

  const campos: Array<FormField> = [
    { nombre: 'photo', etiqueta: 'Foto', tipo: 'file', image: true},
    { nombre: 'name', etiqueta: 'Nombre', tipo: 'text' },
    { nombre: 'apellido', etiqueta: 'apellido', tipo: 'text' },
    { nombre: 'dni', etiqueta: 'DNI', tipo: 'text' },
    { nombre: 'phone', etiqueta: 'Teléfono', tipo: 'tel' },
    { nombre: 'email', etiqueta: 'Email', tipo: 'email' },
    { nombre: 'password', etiqueta: 'Contraseña', tipo: 'password' },
    { nombre: 'helperLocation', etiqueta: 'Sede Asignada', tipo: 'text' },
  ]

  return <GenericForm campos={campos} listener={handleRegister} modalId={modalId} />;
}