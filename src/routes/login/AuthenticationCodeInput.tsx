import { useState } from 'react';
import { User } from 'src/utils/User';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';

export default function AuthenticationCodeInput() {
  const [code, setCode] = useState('');
  const { setUser } = User()
  const { setRoute } = RoutesHandler()

  const handleChange = (e) => {
    const value = e.target.value
    if (isNaN(value)) {
      return
    }
    setCode(e.target.value);
  };

  const submit = (code: string) => {
    fetch(`${serverAddress}/${endPoints.verificationCode}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        code
      })
    }).then(res => {
      if(!res.ok) {
        throw new Error()
      }
      return res.json()
    }).then(data => {
      setUser(data);
      setRoute(routes.main);
    }).catch(() => alert('Codigo incorrecto'))
  }

  const handleSubmit = () => {
    if (code.length !== 6) {
      return alert('El código de autenticación debe tener 6 dígitos.');
    }
    submit(code);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white w-80 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Ingrese su código de autenticación de 6 dígitos</h2>
        <input
          type="text"
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full text-center"
          value={code}
          onChange={handleChange}
          maxLength={6}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};
