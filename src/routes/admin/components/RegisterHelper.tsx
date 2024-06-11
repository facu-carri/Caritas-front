/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "react-query";
import { getHeaders, postData } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { HelperData, Location } from "src/types/Types"
import GenericForm from "../../../components/GenericForm";
import { useCustomModal } from "src/context/CustomModalContext";
import { FormField, ListItem } from "src/types/PropsTypes";

const campos_default: Array<FormField> = [
  { nombre: 'Nombre completo', etiqueta: 'name', tipo: 'text' },
  { nombre: 'Email', etiqueta: 'email', tipo: 'email' },
  { nombre: 'DNI', etiqueta: 'dni', tipo: 'text' },
  { nombre: 'Teléfono', etiqueta: 'phone', tipo: 'tel' },
  { nombre: 'Foto', etiqueta: 'photo', tipo: 'file'},
  { nombre: 'Fecha de nacimiento', etiqueta: 'birthdate', tipo: 'date' },
  { nombre: 'Contraseña', etiqueta: 'password', tipo: 'password' },
  { nombre: 'Repetir contraseña', etiqueta: 'password-check', tipo: 'password' }
]

// Componente de Registro de Ayudante
export default function RegisterHelper() {

  const [campos, setCampos] = useState(campos_default)
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

  function handleRegister(helper: HelperData) {
    postData(endPoints.registerHelper, null, helper)
      .then(() => closeModal())
      .catch((errCode: number) => handleError(errCode))
  }

  function generateLocationSelect(locations: Location[]): FormField {
    const items: ListItem[] = locations.map(location => ({
      key: location.id,
      value: location.name
    }))
    return { nombre: 'Selecciona una filial', etiqueta: 'employeeLocationId', tipo: 'list', items }
  }

  useQuery({
    queryKey: ['location'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.location}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json()),
    onSuccess: data => {
      if(campos.find(campo => campo.etiqueta === 'employeeLocationId')) {
        return; // evitar que se agreguen campos de filial duplicados
      }
      const locationSelector = generateLocationSelect(data);
      setCampos(prev => [...prev, locationSelector]);
    }
  })

  return (
    <GenericForm id="register-helper" campos={campos} listener={handleRegister} error={error} />
  )
}