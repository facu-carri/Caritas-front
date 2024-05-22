/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, postData, putData } from "src/libs/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";
import { Location } from "../filiales/EliminarModal";

type Exchanger = {
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
  exchanger: Exchanger,
  onSave: (ev) => void,
  closeModal: (ev) => void
}

export default function EditExchangerModal({exchanger, onSave, closeModal}: Props) {

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

  const handleEdit = (data: Exchanger) => {
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
      { nombre: 'Nombre completo', etiqueta: 'name', value: exchanger.name, tipo: 'text' },
      { nombre: 'Contraseña', etiqueta: 'password', value: exchanger.password, tipo: 'password' },
      { nombre: 'DNI', etiqueta: 'dni', value: exchanger.dni, tipo: 'text' },
      { nombre: 'Teléfono', etiqueta: 'phone', value: exchanger.phone, tipo: 'tel' },
      { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', value: exchanger.birthdate, tipo: 'date'}
    ]
  }

  useEffect(() => {
    if (!exchanger) return
    console.log(getDefaultFileds())
    getData(endPoints.location)
      .then((employeeLocationids: Location[]) => generateFields(employeeLocationids))
      .then((fields) => setCampos([...getDefaultFileds(), fields]))
  }, [exchanger])

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}