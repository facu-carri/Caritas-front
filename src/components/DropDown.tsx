import { useState } from 'react';
import { User } from 'src/libs/User';

const CircularDropdown = ({icon}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = User()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
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
              <button onClick={logout} className="flex items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularDropdown;
