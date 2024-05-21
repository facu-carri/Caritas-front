/* eslint-disable @typescript-eslint/no-explicit-any */
import { postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField } from "../GenericForm";
import { endPoints } from "src/libs/constants";

type Type = {
  photo: string,
  name: string,
  apellido: string,
  dni: string,
  phone: string,
  email: string,
  password: string,
  helperLocation: string
}

// Componente de Registro de Ayudante
export default function RegisterHelper() {

  const handleRegister = (data: Type) => {
    postData(endPoints.registerHelper, null, data)
  }

  const campos: Array<FormField> = [
    { nombre: 'Foto', etiqueta: 'photo', tipo: 'file', image: true},
    { nombre: 'Nombre', etiqueta: 'name', tipo: 'text' },
    { nombre: 'Apellido', etiqueta: 'apellido', tipo: 'text' },
    { nombre: 'DNI', etiqueta: 'dni', tipo: 'text' },
    { nombre: 'Teléfono', etiqueta: 'phone', tipo: 'tel' },
    { nombre: 'Email', etiqueta: 'email', tipo: 'email' },
    { nombre: 'Contraseña', etiqueta: 'password', tipo: 'password' },
    { nombre: 'Sede Asignada', etiqueta: 'helperLocation', tipo: 'text' },
  ]

  return <GenericForm campos={campos} listener={handleRegister} />;
}