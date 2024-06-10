/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericForm, { FormField } from "../GenericForm";
import { useState } from "react";
import { ExchangerData } from "src/types/Types";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

type Props = {
  campos: FormField[],
  onSave: (ev) => void,
}

export default function EditExchangerModal({campos, onSave}: Props) {

  const [error, setError] = useState<ErrorCode>(null)

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleEdit = (data: ExchangerData) => {
    try {
      onSave(data)
    } catch (err) {
      handleError(parseInt(err))
    }
  }

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}