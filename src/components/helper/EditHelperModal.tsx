/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, postData } from "src/libs/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";
import { Location } from "../filiales/EliminarModal";

type Type = {
  name: string,
  dni: string,
  phone: string,
  email: string,
  password: string,
  employeeLocationId: string
}

export default function EditHelpersModal({helper, onSave, onClose, closeModal}) {

  const [error, setError] = useState<ErrorCode>(null)
  
  const campos_default: Array<FormField> = [
    { nombre: 'Nombre', etiqueta: helper.firstName, tipo: 'text' },
    { nombre: 'Email', etiqueta: helper.email, tipo: 'email' },
    { nombre: 'Contraseña', etiqueta: helper.password, tipo: 'password' },
    { nombre: 'DNI', etiqueta: helper.dni, tipo: 'text' },
    { nombre: 'Teléfono', etiqueta: helper.phone, tipo: 'tel' },
  ]

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleEdit = (data: Type) => {
    onSave(data)
    onClose()
    postData(endPoints.registerHelper, null, data)
      .then(() => closeModal())
      .catch((errCode: number) => handleError(errCode))
  }

  function generateFields(employeeLocationids: Location[]): FormField{
    const field:FormField = { nombre: 'Selecciona una filial', etiqueta: 'employeeLocationId', tipo: 'list' }
    const items: ListItem[] = employeeLocationids.map((employeeLocationid) => ({
      key: employeeLocationid.id,
      value: employeeLocationid.description
    }))
    field.items = items
    return field
  }

  useEffect(() => {
    getData(endPoints.location)
      .then((employeeLocationids: Location[]) => generateFields(employeeLocationids))
      .then((fields) => setCampos([...campos, fields]))
  }, [])

  const [campos, setCampos] = useState(campos_default)

  return <GenericForm campos={campos} listener={handleEdit} error={error} btnText="Editar" />;
}