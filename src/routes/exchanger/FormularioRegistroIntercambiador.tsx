import { useState } from 'react';
import Input from 'src/components/Input';
import RoutesHandler from 'src/libs/routesHandler';
import { endPoints, routes } from 'src/libs/constants';
import { postData } from 'src/libs/request/httpRequests';

// Componente de formulario de registro
export default function FormularioRegistroIntercambiador() {
  return (
    <div className="mx-auto max-w-md space-y-6 flex flex-col justify-center items-center h-[100vh] text-[100%]">
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

  function handleSubmit(event) {
    event.preventDefault()
    postData(endPoints.registerExchanger, null, {
      name,
      birthdate,
      dni,
      phone,
      email,
      password
    })
      .then(() => setRoute(routes.login))
      .catch((errorCode: number) => {
        console.log(errorCode)
      })
  }

  return (
    <form className="space-y-4">
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
  );
}

// Componente de etiqueta de formulario
function FormLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block font-medium">{children}</label>;
}
