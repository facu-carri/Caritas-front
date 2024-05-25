/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericForm, { FormField } from "../../../components/GenericForm";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

type Exchanger = {
  name: string,
  phone: string,
  birthdate: string
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
    console.log('data', data)
    onSave(data)
    closeModal(null);
  }

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre completo', etiqueta: 'name', value: exchanger.name, tipo: 'text' },
      { nombre: 'Teléfono', etiqueta: 'phone', value: exchanger.phone, tipo: 'tel' },
      { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', value: exchanger.birthdate, tipo: 'date'}
    ]
  }

  useEffect(() => {
    setCampos(getDefaultFileds())
  }, [exchanger])

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}