/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from 'react-avatar';

/*const comments = [
  { name: "John Doe", comment: "Great product! I've been using it for a week and it's been a game-changer.", daysAgo: "2 days ago", stars: 4, color: "text-red-500" },
  { name: "Jane Smith", comment: "I'm really impressed with the quality of this product. Highly recommended!", daysAgo: "5 days ago", stars: 5, color: "text-blue-500" },
];*/


import { getData } from "src/libs/request/httpRequests";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from 'react';

type UserData = {
  id:number
  name:string
  birthdate:string
  email: string
  dni: string
  phone: string
  photo: string
  employeeLocation: Location 
}
type Location = {
  id:number
  coordinates:string
  description:string 
}

type Props = {
  id?: number|string
}

function Profile({id}: Props) {
  const [userData, setUserData] = useState<UserData>();
  
  function setData(userData){
    //TODO: if(error == 404)
      setUserData(userData)
  }   

  useEffect(() => {
    console.log(id)
    getData(`${id ? `${endPoints.otherProfileHelper}${id}` : endPoints.profileHelper}`)
      .then(userData => setData(userData));
  }, []);
  
  if (!userData) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-red-500 to-blue-500">
        <header className="py-8 px-6 md:px-12 mt-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Avatar name={userData.name} size="48" round={true} />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-sm">@{userData.email}</p>
              </div>
            </div>
          </div>
        </header>
      </div>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Informacion Personal</h2>
            <div className="mb-4">
              <img src={`data:image/jpeg;base64,${userData.photo}`} alt={userData.name} className="w-full rounded" />
            </div>    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                //{ title: "Location", value: userData.name, color: "text-red-500" },
                { title: "Name", value: userData.name, color: "text-red-500" },
                { title: "Email", value: userData.email, color: "text-red-500" },
                { title: "DNI", value: userData.dni, color: "text-blue-500" },
                { title: "Phone", value: userData.phone, color: "text-blue-500" },
                //{ title: "Photo", value: userData.photo, color: "text-blue-500" },
                { title: "Location", value: userData.employeeLocation.id, color: "text-blue-500" },
                { title: "Birthdate", value: userData.birthdate, color: "text-red-500" },
              ].map((info, idx) => (
                <div key={`info-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}