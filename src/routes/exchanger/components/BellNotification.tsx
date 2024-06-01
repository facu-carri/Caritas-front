import { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';


/*FALTA LA CONEXAO DO BACKEND MANITO FIFU FIFU*/
export function BellNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaBell className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-blue-500 text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-4 text-left" role="none">
            <div className="mb-4 text-lg font-medium">Notificaciones</div>
            <div className="space-y-4">
              {/* Aquí podrías añadir el contenido de las notificaciones, osea la parte que larga el back */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BellNotification;
