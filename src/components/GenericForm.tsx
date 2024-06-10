/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '@images/LogoCaritas.png'
import Input from './Input';
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import ErrorAlert from './ErrorAlert';
import { useEffect, useState } from 'react';
import HiddePassword from './HiddePassword';

export type ListItem = {
  key: string|number,
  value: string
}

export type FormField = {
  nombre: string,
  etiqueta: string,
  tipo: string,
  value?: string|number,
  image?: boolean,
  items?: ListItem[],
  optional?: boolean
}

type Type = {
  id: string,
  campos: Array<FormField>,
  listener?: (values: Record<string, any>) => void
  error?: ErrorCode,
  btnText?: string
}

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

function GenericForm({ id, campos, listener, error, btnText }: Type) {

  // state "fields" no utilizado por el momento, 
  // posible futuro refactor para el manejo de los valores
  // de los campos del componente GenericForm
  const [fields, setFields] = useState(campos.map(campo => campo.value))
 
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
          if(img) await getImageBase64(img)
            .then(img => obj[input.id] = img)
            .catch(() => {})
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

  async function handleSubmit(ev:any) {
    ev.preventDefault()
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
      const opt = isOptional(input)
      
      switch (input.type) {
        case 'file':
          const img = opt ? true : input.files[0]
          if(!img) return false
          break;
        case 'select-one':
          const { value: selectValue } = opt ? true : input.options[input.selectedIndex]
          if(!selectValue) return false;
          break
        case 'password':
          if(!checkVerifyPassword(input)) return false
          break
        default:
          const { value } = opt ? true : input
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
      <img src={logo} alt="Logo" className="w-full h-auto mb-4 rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 shadow-2xl" />
      {
        <ErrorAlert show={error != null}>
          <span>{error && error.getMessage()}</span>
        </ErrorAlert>
      }
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
          <button disabled={!areFieldsEmpty} onClick={handleSubmit} className="bg-red-500 disabled:bg-gray-200 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">
            {btnText ?? 'Enviar'}
          </button>
        }
      </form>
    </div>
  );
}

export default GenericForm;