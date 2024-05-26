/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericForm, { FormField } from "../../../components/GenericForm";
import { useEffect, useState } from "react";
import { ExchangerData } from "src/types/Types";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

type Props = {
  exchanger: ExchangerData,
  onSave: (ev) => void,
}

export default function EditExchangerAsAdminModal({exchanger, onSave}: Props) {

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

  const handleEdit = (data: ExchangerData) => {
    console.log(data)
    onSave(data)
    /*postData(endPoints.registerHelper, null, data)
      .then(() => closeModal(null))
      .catch((errCode: number) => handleError(errCode))*/
  }

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre completo', etiqueta: 'name', value: exchanger.name, tipo: 'text' },
      { nombre: 'Contraseña', etiqueta: 'password', value: exchanger.password, tipo: 'password' },
      { nombre: 'DNI', etiqueta: 'dni', value: exchanger.dni, tipo: 'text' },
      { nombre: 'Teléfono', etiqueta: 'phone', value: exchanger.phone, tipo: 'tel' },
    ]
  }

  useEffect(() => {
    if (!exchanger) return
    console.log(getDefaultFileds())

    setCampos([...getDefaultFileds()])
  }, [exchanger])

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}