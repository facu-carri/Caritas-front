/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, postData, putData } from "src/libs/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";
import { Location } from "../filiales/EliminarModal";

type Helper = {
  id: number,
  name: string,
  dni: string,
  phone: string,
  email: string,
  password: string,
  birthdate: string,
  employeeLocationId: string
}

type Props = {
  helper: Helper,
  onSave: (ev) => void,
  closeModal: (ev) => void
}

export default function EditExchangerAsAdminModal({helper, onSave, closeModal}: Props) {

  const [error, setError] = useState<ErrorCode>(null)
  const [campos, setCampos] = useState([])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleEdit = (data: Helper) => {
    console.log(data)
    onSave(data)
    /*postData(endPoints.registerHelper, null, data)
      .then(() => closeModal(null))
      .catch((errCode: number) => handleError(errCode))*/
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

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre completo', etiqueta: 'name', value: helper.name, tipo: 'text' },
      { nombre: 'Contraseña', etiqueta: 'password', value: helper.password, tipo: 'password' },
      { nombre: 'DNI', etiqueta: 'dni', value: helper.dni, tipo: 'text' },
      { nombre: 'Teléfono', etiqueta: 'phone', value: helper.phone, tipo: 'tel' },
    ]
  }

  useEffect(() => {
    if (!helper) return
    console.log(getDefaultFileds())
    getData(endPoints.location)
      .then((employeeLocationids: Location[]) => generateFields(employeeLocationids))
      .then((fields) => setCampos([...getDefaultFileds(), fields]))
  }, [helper])

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}