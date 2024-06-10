/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import GenericForm, { FormField } from "src/components/GenericForm";
import { EditItemModalProps } from "src/types/PropsTypes";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { selectCategories } from "src/components/modals/modalOptions";

export default function EditItemModal({ itemData, onEditItem }: EditItemModalProps) {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState<ErrorCode>(null)
  const [campos, setCampos] = useState([])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.EDIT_ITEM_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => setError(null)

  const handleAddItem = (data) => {
    putData(`${endPoints.addItem}/${itemData.id}`, null, data)
      .then(new_data => {
        console.log(new_data)
        onEditItem(new_data)
      })
      .catch(err => handleError(err))
  }

  function getDefaultFileds(): Array<FormField> {
    return [
      { nombre: 'Nombre', etiqueta: 'name', value: itemData.name, tipo: 'text' },
      { nombre: 'Descripcion', etiqueta: 'description', value: itemData.description, tipo: 'text' },
      { nombre: 'Foto', etiqueta: 'photo', value: '', tipo: 'file', optional:true },
      { nombre: 'Cantidad', etiqueta: 'quantity', value: itemData.quantity, tipo: 'number' },
    ]
  }

  useEffect(() => {
    getData(endPoints.categories)
      .then(data => setCategories(data))
      .catch(err => handleError(err))
  }, [])

  useEffect(() => {
    if(categories.length == 0 || !itemData) return
    setCampos([...getDefaultFileds(), selectCategories(categories)])
  }, [categories])

  return ( campos && campos.length > 0 &&
    <GenericForm id="register-helper" campos={campos} listener={handleAddItem} error={error} />
  )
}