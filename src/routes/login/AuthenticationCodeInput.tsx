import { useState } from 'react';
import { postData } from 'src/libs/request/httpRequests';

const AuthenticationCodeInput = () => {
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = (code) => {
    //postData()
  }

  const handleSubmit = () => {
    if (code.length === 6) {
      onSubmit(code);
    } else {
      alert('El código de autenticación debe tener 6 dígitos.');
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white w-80 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ingrese su código de autenticación de 6 dígitos</h2>
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
          Enviar
        </button>
      </div>
    </div>
  );
};

export default AuthenticationCodeInput;
