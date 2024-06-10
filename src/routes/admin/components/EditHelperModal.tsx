/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData } from "src/utils/request/httpRequests";
import GenericForm, { FormField } from "../../../components/GenericForm";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { HelperData } from "src/types/Types";
import { selectLocations } from "src/components/modals/modalOptions";

type Props = {
  helper: HelperData,
  onSave: (ev) => void,
  closeModal: (ev) => void
}

export default function EditHelpersModal({helper, onSave}: Props) {

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

  const handleEdit = (data: HelperData) => {
    try {
      console.log(data)
      onSave(data)
    } catch (err) {
      handleError(err)
    }
  }

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre completo', etiqueta: 'name', value: helper.name, tipo: 'text' },
      { nombre: 'Contraseña', etiqueta: 'password', value: helper.password, tipo: 'password' },
      { nombre: 'DNI', etiqueta: 'dni', value: helper.dni, tipo: 'text' },
      { nombre: 'Teléfono', etiqueta: 'phone', value: helper.phone, tipo: 'tel' },
      { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', value: helper.birthdate, tipo: 'date'}
    ]
  }

  useEffect(() => {
    if (!helper) return
    console.log(getDefaultFileds())
    getData(endPoints.location)
      .then((locations) => setCampos([...getDefaultFileds(), selectLocations(locations)]))
  }, [helper])

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}