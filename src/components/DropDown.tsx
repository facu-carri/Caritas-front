import { useState } from 'react';
import Button, { ButtonType } from './Button';

export type DropdownItem = {
  icon?: JSX.Element,
  items: Array<ButtonType>
}

const CircularDropdown = ({icon, items}: DropdownItem) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  function getItems(){
    return items.map((item) => (
      <Button onClick={item.onClick} className="flex items-center px-4 py-2 text-sm hover:bg-blue-600 hover:text-white" role="menuitem" key={item.text}>
        {item.text}
        {item.icon}
      </Button>
    ))
  }

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
              {getItems()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularDropdown;
