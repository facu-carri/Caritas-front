/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData, postData, putData } from "src/libs/request/httpRequests";
import GenericForm, { FormField, ListItem } from "../GenericForm";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from "react";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";
import { Location } from "../filiales/EliminarModal";
import { useCustomModal } from "src/context/CustomModalContext";

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