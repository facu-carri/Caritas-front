import { useState } from 'react';

const CircularDropdown = ({icon}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-0 right-0 mt-4 mr-4">
      <div className="relative inline-block text-right">
        <div>
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {icon ? icon : ''}
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-blue-500 text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="none">
              <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                Cerrar Sesión
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Mi Inventario
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5a1 1 0 001 1h5"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5a1 1 0 001 1h5"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19v1a2 2 0 01-2 2H5.83a1 1 0 01-.7-.29l-1.88-1.88a1 1 0 010-1.41l12-12a1 1 0 011.41 0l1.88 1.88a1 1 0 010 1.41l-7 7a1 1 0 01-.71.29"></path>
                </svg>
                Configuración
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularDropdown;
