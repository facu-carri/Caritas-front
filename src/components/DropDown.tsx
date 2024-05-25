import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { Dropdown } from 'src/types/Types';

const CircularDropdown = ({icon, items}: Dropdown) => {
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

  function getItems(){
    return items.map((item) => (
      <Button onClick={item.onClick} className="flex w-full items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" key={item.text}>
        {item.text}
        {item.icon}
      </Button>
    ))
  }

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
            {icon ? icon : ''}
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-blue-500 text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="none">
              {getItems()}
            </div>
          </div>
        )}
      </div>
  );
};

export default CircularDropdown;