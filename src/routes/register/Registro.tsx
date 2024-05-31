import { useState } from 'react';
import Input from 'src/components/Input';
import RoutesHandler from 'src/utils/routesHandler';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import { ErrorTypes } from 'src/utils/Error/ErrorTypes';
import ErrorAlert from 'src/components/ErrorAlert';
import { MouseEvent } from 'src/types/Types';
import { getImageBase64 } from 'src/components/GenericForm';

// Componente de formulario de registro
export default function Registro() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] text-[100%]">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Registro</h1>
        <p className="text-gray-700">Completa el formulario para crear una nueva cuenta.</p>
      </div>
      <RegistrationFields />
    </div>
  );
}

// Componente para los campos de registro
function RegistrationFields() {

  const { setRoute } = RoutesHandler()

  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [dni, setDni] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photoFile, setPhotoFile] = useState(null)

  const [error, setError] = useState<ErrorCode>(null)

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_EXCHANGER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => setError(null)

  async function handleSubmit(event:MouseEvent) {
    event.preventDefault()

    if (!name || !birthdate || !dni || !phone || !email || !password) { handleError(403); return }

    let photo

    photoFile && await getImageBase64(photoFile).then(_photo => photo = String(_photo))

    console.log('photo', photo)

    fetch(`${serverAddress}/${endPoints.registerExchanger}`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ name, birthdate, dni, phone, photo, email, password })
    })
    .then(res => {
        if(!res.ok) handleError(res.status)
        return res.json()
    })
    .then(() => setRoute(routes.login))
  }

  const validateName = (name:string) => {
    if (name.match(/[0-9]+/)) return
    setName(name)
  }

  const validateDni = (dni: string) => {
    if (dni.match(/[a-zA-Z]/)) return
    setDni(dni)
  }

  const validatePhone = (phone: string) => {
    if (phone.match(/[a-zA-Z]{1,}/)) return
    if (phone.match(/[ ]{2,}/)) return
    setPhone(phone)
  }

  return (
      <form className="space-y-4 mt-5">
      {<ErrorAlert show={error != null} attrs='w-full'>
        <span>{error && error.getMessage()}</span>
      </ErrorAlert>}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="first-name">Nombre completo</FormLabel>
          <Input text={"Ingresa nombre completo"} value={name} onChange={e=>validateName(e.target.value)}></Input>
        </div>
        <div className='space-y-2'>
          <FormLabel htmlFor="first-name">Foto de perfil</FormLabel>
          <Input file={true} onChange={(e) => setPhotoFile(e.target.files[0])}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="birthdate">Fecha Nacimiento</FormLabel>
          <Input text={"Ingresa tu fecha de nacimiento"} type="date" onChange={e=>setBirthdate(e.target.value)}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="dni">DNI</FormLabel>
          <Input text={"Ingresa tu DNI"} value={dni} maxLength={10} onChange={e=>validateDni(e.target.value)}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="phone">Teléfono</FormLabel>
          <Input text={"Ingresa tu télefono"} value={phone} onChange={e=>validatePhone(e.target.value)}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input text={"Ingresa tu contraseña"} type={"Password"} onChange={e=>setPassword(e.target.value)}></Input>
        </div>
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="email">Correo electrónico</FormLabel>
        <Input text={"Ingresa tu correo"} onChange={e=>setEmail(e.target.value)}></Input>
      </div>
      <button onClick={handleSubmit} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
        Registrarse
      </button>
    </form>
  )
}

// Componente de etiqueta de formulario
function FormLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block font-medium">{children}</label>;
}
