import { useState } from 'react';
import Input from 'src/components/Input';
import RoutesHandler from 'src/utils/routesHandler';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import { postData } from 'src/utils/request/httpRequests';
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import { ErrorTypes } from 'src/utils/Error/ErrorTypes';
import ErrorAlert from 'src/components/ErrorAlert';

// Componente de formulario de registro
export default function FormularioRegistroIntercambiador() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] text-[100%]">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Regístrate</h1>
        <p className="text-gray-500 dark:text-gray-400">Completa el formulario para crear una nueva cuenta.</p>
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

  const [error, setError] = useState<ErrorCode>(null)

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.REGISTER_EXCHANGER_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    /*postData(endPoints.registerExchanger, null, {
      name,
      birthdate,
      dni,
      phone,
      email,
      password
    })
      .then(() => setRoute(routes.login))
      .catch((errCode: number) => handleError(errCode))*/

    fetch(`${serverAddress}/${endPoints.registerExchanger}`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            name,
            birthdate,
            dni,
            phone,
            email,
            password
        })
    })
        .then(res => {
            if(!res.ok) {
              handleError(res.status)
            }
            return res.json()
        })
        .then(() => setRoute(routes.login))
  }

  return (
    <>
      <form className="space-y-4">
      {<ErrorAlert show={error != null} attrs='w-full'>
        <span>{error && error.getMessage()}</span>
      </ErrorAlert>}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="first-name">Nombre completo</FormLabel>
          <Input text={"Ingresa nombre completo"} onChange={e=>setName(e.target.value)}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="birthdate">Fecha Nacimiento</FormLabel>
          <Input text={"Ingresa tu fecha de nacimiento"} type="date" onChange={e=>setBirthdate(e.target.value)}></Input>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="dni">DNI</FormLabel>
          <Input text={"Ingresa tu DNI"} onChange={e=>setDni(e.target.value)}></Input>
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="phone">Teléfono</FormLabel>
          <Input text={"Ingresa tu télefono"} onChange={e=>setPhone(e.target.value)}></Input>
        </div>
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="email">Correo electrónico</FormLabel>
        <Input text={"Ingresa tu correo"} onChange={e=>setEmail(e.target.value)}></Input>
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <Input text={"Ingresa tu contraseña"} type={"Password"} onChange={e=>setPassword(e.target.value)}></Input>
      </div>
      <button onClick={handleSubmit} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
        Registrarse
      </button>
    </form>
    </>
  );
}

// Componente de etiqueta de formulario
function FormLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block font-medium">{children}</label>;
}
