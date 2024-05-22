/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '@images/LogoCaritas.png'
import Input from './Input';
import { ErrorCode } from 'src/libs/Error/ErrorCode';
import ErrorAlert from './ErrorAlert';

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

function GenericForm({ campos, listener, error, btnText }: Type) {

  async function getInputValues(): Promise<Record<string, any>> {
    const inputs = document.getElementsByName('inputField')
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
          obj[input.id] = select.options[select.selectedIndex].text
          break
        default:
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

  const getItemsObjs = (items:Array<ListItem>, key:string) => {
    return items.map((item, index) => (
      <option key={`${key}_${index}`}>
          {item.key}
      </option>
    ))
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
            <label className="block font-semibold mb-2 text-blue-900">{campo.nombre}</label>
            {
              campo.tipo === 'list' ?
                <select name='inputField' id={campo.etiqueta} className="select select-bordered w-full max-w-xs">{getItemsObjs(campo.items, 'items')}</select>
              :
              campo.tipo === 'date' ?
                <Input file={campo.tipo == 'date'} defaultValue={campo.value} name='inputField' id={campo.etiqueta} type={'date'} />
                :
                <Input file={campo.tipo == 'file'} defaultValue={campo.value} name='inputField' id={campo.etiqueta} type={campo.tipo}  />
            }
          </div>
        ))}
        {error == null && <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">
          {btnText ?? 'Enviar'}
        </button>}
      </form>
    </div>
  );
}

export default GenericForm;