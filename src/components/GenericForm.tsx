/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '@images/LogoCaritas.png'
import Input from './Input';

export type FormField = {
  nombre: string,
  etiqueta: string,
  tipo: string,
  image?: boolean
}

type Type = {
  campos: Array<FormField>,
  listener?: (values: Record<string, any>) => void,
  modalId?: string
}

function GenericForm({ campos, listener, modalId }: Type) {


  const closeModal = () => {
    const elem = modalId && (document.getElementById(modalId) as HTMLDialogElement)
    elem?.close()
  }

  async function getImageBase64(img:File) {
    return new Promise((resolve, reject) => {
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

  async function getInputValues(): Promise<Record<string, any>> {
    const inputs = document.getElementsByName('inputField')
    const obj = {}
    for (const inputField of inputs) {
      const input = inputField as HTMLInputElement
      if (input.type == 'file') {
        const img = input.files[0]
        const imageData = await getImageBase64(img)
        if(imageData) obj[input.id] = imageData
      } else {
        obj[input.id] = input.value
      }
    }
    return obj
  }

  async function handleSubmit(ev:any) {
    ev.preventDefault()
    const data = await getInputValues()
    listener(data)
    closeModal()
  }
  
  return (
    <div className="modal-box rounded-lg max-w-md mx-auto p-8 my-8 transition-transform hover:scale-105 shadow-2xl bg-navbar-blue">
      <img src={logo} alt="Logo" className="w-full h-auto mb-4 rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 shadow-2xl" />
      <form className="text-center">
        {campos.map((campo) => (
          <div key={campo.nombre} className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">{campo.etiqueta}</label>
            {
              <Input file={campo.image} name='inputField' id={campo.etiqueta} type={campo.tipo} text=''/>
            }
          </div>
        ))}
        <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default GenericForm;