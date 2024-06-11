/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '@images/LogoCaritas.png'
import Input from './Input';
import ErrorAlert from './ErrorAlert';
import { useEffect, useState } from 'react';
import HiddePassword from './HiddePassword';
import { useCustomModal } from 'src/context/CustomModalContext';
import { FormField, GenericFormProps } from 'src/types/PropsTypes';
import ConfirmationModal from './modals/Confirmation';
import { MouseEvent } from 'src/types/Types';

export async function getImageBase64(img: File) {
  return new Promise((resolve, reject) => {
    if (!img) reject(null)
    const reader = new FileReader();
    reader.readAsDataURL(img)
    reader.onload = (() => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String)
    })
    reader.onerror = () => {
      reject(null)
    }
  })
}

function GenericForm({ id, campos, listener, error, btnText, hideImg, showConfirm, children }: GenericFormProps) {

  // state "fields" no utilizado por el momento, 
  // posible futuro refactor para el manejo de los valores
  // de los campos del componente GenericForm
  const [fields, setFields] = useState(campos.map(campo => campo.value))
  const [isLoading, setIsLoading] = useState(false)
  const { showModal } = useCustomModal()

  useEffect(() => {
    if(error != null) setIsLoading(false)
  }, [error])

  function setField(fieldName, value) {
    setFields(prevFields => ({
      ...prevFields,
      [fieldName]: value // Correctly set value using immutability
    }));
  }

  async function getInputValues(): Promise<Record<string, any>> {
    const inputs = document.getElementsByName(id)
    const obj = {}

    for (const inputField of inputs) {
      const input: any = inputField

      switch (input.type) {
        case 'file':
          const img = (input as HTMLInputElement).files[0] ?? null
          if (img) await getImageBase64(img).then(img => obj[input.id] = img).catch(() => { })
          break
        case 'select-one':
          const select = input as HTMLSelectElement
          obj[input.id] = select.options[select.selectedIndex].value ?? null
          break
        case 'password':
          if (input.id.lastIndexOf('-check') == -1) obj[input.id] = input.value
          break
        default:
          obj[input.id] = input.value
      }
      if(!obj[input.id]) delete obj[input.id]
    }
    return obj
  }

  async function handleSubmit(ev: MouseEvent) {
    ev.preventDefault()
    if(isLoading) return
    setIsLoading(true)
    if(showConfirm) showModal(<ConfirmationModal onAccept={handleConfirm}/>)
    else handleConfirm()
  }

  async function handleConfirm() {
    const data = await getInputValues()
    listener(data)
  }

  const isOptional = (field) => {
    const attr = (field as HTMLElement).getAttribute('optional-attr')
    const values = { undefined: undefined, null: null, true: true, false: false }
    const value = values[attr]
    return !!value
  }

  const checkVerifyPassword = (input:HTMLInputElement) => {
    const id = input.id
    const key = '-check'
    const isCheck = id.lastIndexOf(key) != -1
    const checkInput: HTMLInputElement = (!isCheck ? document.getElementById(`${id}${key}`) : input) as HTMLInputElement
    const realInput: HTMLInputElement = (isCheck ? document.getElementById(id.substring(0, id.length - key.length)) : input) as HTMLInputElement
    
    const optional = !realInput?.value && !checkInput?.value ? isOptional(realInput) : false// si tengo algun valor no es opcional

    if(optional && (!realInput?.value || !checkInput?.value)) return isOptional(realInput)
    if(!checkInput) return realInput.value

    return !optional ? realInput.value.length > 0 ? checkInput.value == realInput.value : optional : true
  }

  const [ areFieldsEmpty, setFieldsEmpty ] = useState(true)

  const checkFieldsValue = () => {
    const inputs = document.getElementsByName(id)

    for (const inputField of inputs) {
      const input: any = inputField
      
      if(isOptional(input)) continue

      switch (input.type) {
        case 'file':
          const img = input.files[0]
          if(!img) {
            return false
          }
          break;
        case 'select-one':
          const selectValue = input.options[input.selectedIndex]?.value
          if(!selectValue) {
            return false;
          }
          break;
        case 'password':
          if(!checkVerifyPassword(input)) {
            return false;
          }
          break;
        default:
          const { value } = input
          if(!value) return false;
      }
    }
    return true
  }

  useEffect(() => {
    const empty = checkFieldsValue()
    setFieldsEmpty(empty)
  }, [fields])

  const getField = (campo: FormField) => {
    switch (campo.tipo) {
      case 'list':
        return <select optional-attr={String(campo.optional)} name={id} id={campo.etiqueta} className="select select-bordered w-full max-w-xs" onChange={(e) => setField(campo.etiqueta, e.target.value)}>
          {
            campo?.items.map(({ key, value }) => <option key={key} value={key}>{value}</option>)
          }
        </select>
      case 'password':
        return <HiddePassword optional-attr={String(campo.optional)} defaultValue={campo.value} name={id} id={campo.etiqueta} onChange={(e)=> setField(campo.etiqueta, e.target.value)} />
      default:
        return <Input optional-attr={String(campo.optional)} file={campo.tipo == 'file'} defaultValue={campo.value} name={id} id={campo.etiqueta} type={campo.tipo} onChange={(e)=> setField(campo.etiqueta, e.target.value)} />
    }
  }

  return (
    <div className="modal-box rounded-lg max-w-md mx-auto p-8 my-8 transition-transform hover:scale-105 shadow-2xl bg-navbar-blue">
      <img src={logo} alt="Logo" className={`${hideImg && 'hidden'} w-full h-auto mb-4 rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 shadow-2xl`} />
      {
        <ErrorAlert show={error != null}>
          <span>{error && error.getMessage()}</span>
        </ErrorAlert>
      }
      {children}
      <form className="text-center">
        {campos.map((campo) => (
          <div key={campo.nombre} className="mb-4">
            <label className="block font-semibold mb-4 text-blue-900">{campo.nombre}</label>
            {
              getField(campo)
            }
          </div>
        ))}
        {
          error == null &&
          <button disabled={!areFieldsEmpty || isLoading} onClick={handleSubmit} className="bg-red-500 disabled:bg-gray-200 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">
            {
              isLoading ? <span className="loading loading-spinner"></span> : (btnText ?? 'Enviar')
            }
          </button>
        }
      </form>
    </div>
  );
}

export default GenericForm;