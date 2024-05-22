import { useState } from 'react';

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Listado de Personas</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Filtra por nombre, email, teléfono o DNI.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Buscar..."
                type="text"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
              >
                Filtrar
              </button>
            </form>
          </div>
        </div>
        <div className="grid gap-6 md:gap-8 mt-8">
          {/* Aquí iría la lógica para mostrar las personas filtradas */}
        </div>
      </div>
    </section>
  )
}
