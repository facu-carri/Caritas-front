import logo from '@images/LogoCaritas.png'
import Input from './Input';

function GenericForm({ campos }) {
  return (
    <div className="bg-rose-100 rounded-lg max-w-md mx-auto p-8 my-8 transition-transform hover:scale-105 shadow-2xl">
  <img src={logo} alt="Logo" className="w-full h-auto mb-4 rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 shadow-2xl" /> {/* Usa la imagen importada */}
  <form className="text-center">
    {campos.map((campo) => (
      <div key={campo.nombre} className="mb-4">
        <label className="block font-semibold mb-2 text-blue-900">{campo.etiqueta}</label>
        <Input className='shadow-2xl' type={campo.tipo} text=''/>
      </div>
    ))}
    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 hover:bg-red-700 transform hover:-translate-y-1 hover:scale-105">Enviar</button>
  </form>
</div>
  );
}

export default GenericForm;