/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '@images/LogoCaritas.png'
import Input from './Input';
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import ErrorAlert from './ErrorAlert';
import { useMemo, useState } from 'react';

export type ListItem = {
  key: string|number,
  value: string
}

export type FormField = {
  nombre: string,
  etiqueta: string,
  tipo: string,
  value?: string,
  image?: boolean,
  items?: ListItem[]
}

type Type = {
  id: string,
  campos: Array<FormField>,
  listener?: (values: Record<string, any>) => void
  error?: ErrorCode,
  btnText?: string
}

export async function getImageBase64(img:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if(!img) return null
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
  const [lastChange, setLastChange] = useState('')
 
  function setField(fieldName, value) {
    setLastChange(value)
    setFields(prev => { 
      prev[fieldName] = value
      return prev
    })
  }

  async function getInputValues(): Promise<Record<string, any>> {
    const inputs = document.getElementsByName(id)
    console.log(inputs, inputs.length)
    const obj = {}

    for (const inputField of inputs) {
      const input: any = inputField

      switch (input.type) {
        case 'file':
          const img = (input as HTMLInputElement).files[0]
          const imageData = await getImageBase64(img)
          if(imageData) obj[input.id] = imageData
          break
        case 'select-one':
          const select = input as HTMLSelectElement
          obj[input.id] = select.options[select.selectedIndex].value
          break
        default:
          console.log('default', input.id, input.value)
          obj[input.id] = input.value
      }
    }
    return obj
  }

  async function handleSubmit(ev:any) {
    ev.preventDefault()
    const data = await getInputValues()
    listener(data)
  }

  const areFieldsEmpty = useMemo(() => {
    const inputs = document.getElementsByName(id)
    if(inputs?.length === 0) {
      return false;
    }
    for (const inputField of inputs) {
      const input: any = inputField
      switch (input.type) {
        case 'file':
          const img = (input as HTMLInputElement).files[0]
          if(!img) {
            return false;
          }
          break;
        case 'select-one':
          const select = input as HTMLSelectElement
          const { value: selectValue } = select.options[select.selectedIndex]
          if(!selectValue) {
            return false;
          }
          break
        default:
          const { value } = input
          if(!value) {
            return false;
          }
      }
    }
    return true
  }, [lastChange])


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
            <label className="block font-semibold mb-2 text-blue-900">{campo.nombre}</label>
            {
              campo.tipo === 'list' ?
                <select name={id} id={campo.etiqueta} className="select select-bordered w-full max-w-xs" onChange={(e)=>setField(campo.etiqueta, e.target.value)}>{
                  campo?.items.map(({ key, value }) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                  ))
                }</select>
              :
              campo.tipo === 'date' ?
                <Input file={campo.tipo == 'date'} defaultValue={campo.value} name={id} id={campo.etiqueta} type={'date'} onChange={(e)=>setField(campo.etiqueta, e.target.value)} />
                :
                <Input file={campo.tipo == 'file'} defaultValue={campo.value} name={id} id={campo.etiqueta} type={campo.tipo} onChange={(e)=>setField(campo.etiqueta, e.target.value)} />
            }
          </div>
        ))}
        {error == null && <button disabled={!areFieldsEmpty} onClick={handleSubmit} className="bg-red-500 disabled:bg-gray-200 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">
          {btnText ?? 'Enviar'}
        </button>}
      </form>
    </div>
  );
}

export default GenericForm;