import { useState } from 'react';
import ErrorAlert from 'src/components/ErrorAlert';
import { ErrorCode } from 'src/utils/Error/ErrorCode';
import { ErrorTypes } from 'src/utils/Error/ErrorTypes';
import { User } from 'src/utils/User';
import { endPoints, routes, serverAddress } from 'src/utils/constants';
import RoutesHandler from 'src/utils/routesHandler';

export default function AuthenticationCodeInput() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<ErrorCode>(null)
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = User()
  const { setRoute } = RoutesHandler()

  function handleError(errCode: number) {
    const err = new ErrorCode(errCode, ErrorTypes.AUTH_CODE_ERROR)
    setError(err)
    setTimeout(hideError, 5000)
}

  const hideError = () => setError(null)

  const handleChange = (e) => {
    const value = e.target.value
    if (isNaN(value)) return
    setCode(e.target.value);
  };

  const submit = (code: string) => {
    setIsLoading(true)
    fetch(`${serverAddress}/${endPoints.verificationCode}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({code})
    })
    .then(res => {
      if(!res.ok) throw new Error()
      return res.json()
    })
    .then(data => {
      setUser(data);
      setRoute(routes.main);
    })
    .catch(() => handleError(401))
    .finally(() => setIsLoading(false))
  }

  const handleSubmit = () => {
    if (code.length !== 6) handleError(400)
    else submit(code)
  }

  const isValid = code.length === 6

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white w-80 p-8 rounded-lg shadow-lg">
        {
          <ErrorAlert show={error != null}>
              <span>{error && error.getMessage()}</span>
          </ErrorAlert>
        }
        <h2 className="text-xl font-bold mb-4 text-center">Ingrese su código de autenticación de 6 dígitos</h2>
        <input
          type="text"
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-full text-center"
          value={code}
          onChange={handleChange}
          maxLength={6}
          autoFocus={true}
        />
        <button
          onClick={handleSubmit}
          className={`${!isLoading && isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500/50'}  text-white font-bold py-2 px-4 rounded-md`}
          disabled={isLoading || !isValid}
        >
          {isLoading ? <span className="loading loading-spinner"></span> : 'Ingresar'}
        </button>
      </div>
    </div>
  );
}