/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomModal } from "src/context/CustomModalContext";
import GenericForm from "../GenericForm";
import { useState } from "react";
import { ExchangerData } from "src/types/Types";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { EditProfileProps } from "src/types/PropsTypes";

export default function EditProfileModal({campos, onSave, showConfirm}: EditProfileProps) {

  const [error, setError] = useState<ErrorCode>(null)
  const { closeModal } = useCustomModal()

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_HELPER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const handleEdit = (data: ExchangerData) => {
    onSave(data)
      .then(() => closeModal())
      .catch((errCode: number) => handleError(errCode))
  }

  return campos && campos.length > 0 && <GenericForm id="edit-helpers-modal" campos={campos} showConfirm={showConfirm} listener={handleEdit} error={error} btnText="Aplicar cambios" />;
}