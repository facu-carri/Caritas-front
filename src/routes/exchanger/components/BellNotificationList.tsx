import { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getHeaders } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from 'src/utils/constants';
import BellNotificationCard from "./BellNotificationCard";

const fetchNotifications = async () => {
  const response = await fetch(`${serverAddress}/${endPoints.notification}`,{
    method:'GET',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Hubo un error con la peticion al backend');
  }
  return response.json();
};


export function BellNotificationList() {
  const { data, error, isLoading } = useQuery('exchanges', fetchNotifications);
  const notifications = data
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
    <div className="relative inline-block text-right " ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaBell className="w-6 h-6 text-gray-800 " />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-blue-500 text-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto	h-96">
          <div className="py-1 px-4 text-left" role="none">
            <div className="mb-4 text-lg font-medium ">Solicitudes de intercambio</div>
            <div className="space-y-4">
              { (notifications && notifications.length > 0) ? (
                notifications.map(notification =>
                  <BellNotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                )
              ) : (
                <div className="text-center text-gray-300">No hay notificaciones</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BellNotificationList;
