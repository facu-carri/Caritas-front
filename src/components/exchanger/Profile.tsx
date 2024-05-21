import Avatar from 'react-avatar';

/*const comments = [
  { name: "John Doe", comment: "Great product! I've been using it for a week and it's been a game-changer.", daysAgo: "2 days ago", stars: 4, color: "text-red-500" },
  { name: "Jane Smith", comment: "I'm really impressed with the quality of this product. Highly recommended!", daysAgo: "5 days ago", stars: 5, color: "text-blue-500" },
];*/


import { getData } from "src/libs/request/httpRequests";
import { endPoints } from "src/libs/constants";
import { useEffect, useState } from 'react';

type UserData = {
  id: number,
  name: string,
  email: string, 
  dni: string,
  phone: string, 
  photo: string,
  stars: number,
  absentees: number,
}
type ItemData = {
  id: number
  photo: string
  name: string
  description: string
  owner: UserData
  itemCategory: ItemCategory
}
type ItemCategory = {
  id: number
  name: string
}
type Review = {
  id: number
  name: string
  description: string
  stars: number
/*TODO USAR ESTO PARA MOSTRAR LAS ESTRELLAS: {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"} />
        ))} */

  date: string // TODO:Date
  //TODO: otros
}


function Profile() {
  const [userData, setUserData] = useState<UserData>();
  const [inventory, setInventory] = useState<ItemData[]>();
  const [reviews, setReviews] = useState<Review[]>();
  
  function resetInvetory(error){
    if(error == 404)
      setInventory([])
  }   
  
  function resetReviews(error){
    //TODO: if(error == 404)
    setInventory([])
  }

  useEffect(() => {
    getData(endPoints.profile)
      .then(userData => setUserData(userData));
    getData(endPoints.inventory)
      .then(inventory => setInventory(inventory))
      .catch(error => resetInvetory(error));
    getData(endPoints.myReviews)
      .then(reviews => setReviews(reviews))
      .catch(error => resetReviews(error));
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
            <div>
              <button className="text-black hover:bg-black/20 border border-black py-2 px-4 rounded">Editar Perfil</button>
            </div>
          </div>
        </header>
      </div>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Informacion Personal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                //{ title: "Location", value: userData.name, color: "text-red-500" },
                { title: "Name", value: userData.name, color: "text-red-500" },
                { title: "Email", value: userData.email, color: "text-red-500" },
                { title: "DNI", value: userData.dni, color: "text-blue-500" },
                { title: "Phone", value: userData.phone, color: "text-blue-500" },
                { title: "Photo", value: userData.photo, color: "text-blue-500" },
                { title: "Stars", value: userData.stars + "/10", color: "text-blue-500" },
                { title: "Absentees", value: userData.absentees, color: "text-red-500" },
              ].map((info, idx) => (
                <div key={`info-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Publicaciones de productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {!(inventory)||inventory.length==0? 
                <div >
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">No hay elementos</p>
                </div>
                : inventory.map((product, idx) => (
                <div key={`product-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <Avatar name={product.name} size="64" round={true} />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-2 ${idx % 2 === 0 ? 'text-red-500' : 'text-blue-500'}`}>{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Published: {product.photo}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comentarios</h2>
            <div className="space-y-4">
              {!(reviews)||reviews.length==0? 
                <div >
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">No hay elementos</p>
                </div>
                :reviews.map((comment, idx) => (
                <div key={`comment-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-gray-200 flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                      <Avatar name={comment.name} size="48" round={true} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-bold text-red-500`}>{comment.name}</h3>
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {[...Array(comment.stars)].map((_, starIdx) => (
                            <StarIcon key={starIdx} className="h-5 w-5" />
                          ))}
                          {[...Array(5 - comment.stars)].map((_, starIdx) => (
                            <StarIcon key={starIdx} className="h-5 w-5 text-gray-300" />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{comment.date}</p>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoveVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{comment.description}</p>
                  </div>
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