/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from 'react-avatar';
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints, roles } from "src/utils/constants";
import { useEffect, useState } from 'react';
import LoadingAnimation from '../../../components/LoadingAnimation';
import EditExchangerModal from '../../../components/modals/EditExchanger';
import { useCustomModal } from 'src/context/CustomModalContext';
import ProductCard from '../components/ProductCard';
import { ItemData } from '../components/ProductListInventory';
import { User } from 'src/utils/User';
import EditExchangerAsAdminModal from 'src/routes/admin/components/EditExchangerAsAdminModal';
import { ExchangerData } from 'src/types/Types';
import { formatDate } from 'src/utils/api';

type Review = {
  id: number
  name: string
  description: string
  stars: number
  date: string
}

type Props = {
  id?: number|string
}

export default function Profile({ id }: Props) {
  const [exchangerData, setUserData] = useState<ExchangerData>();
  const [inventory, setInventory] = useState<ItemData[]>();
  const [reviews, setReviews] = useState<Review[]>();
  const { getRole } = User()
  const { showModal, closeModal } = useCustomModal()
  
  function resetInvetory(error: number){
    if(error == 404) setInventory([])
  }   
  
  function resetReviews(error: number){
    if(error) setReviews([])
  }

  useEffect(() => {
    getData(`${id ? `${endPoints.otherProfile}${id}` : endPoints.profile}`)
      .then(exchangerData => setUserData(exchangerData));

    getData(`${id ? `${endPoints.inventory}/${id}` : endPoints.inventory }`)
      .then(inventory => setInventory(inventory))
      .catch(error => resetInvetory(error));

    getData(endPoints.myReviews)
      .then(reviews => setReviews(reviews))
      .catch(error => resetReviews(error));
  }, [id]);

  function handleEditProfile(newUserInfo) {
    putData(`${endPoints.exchanger}/${exchangerData.id}`, null, {
      ...newUserInfo,
      email: exchangerData.email
    })
      .then(res => console.log(res))
  }

  function showEditModal() {
    const editModal = isAdmin ?
      <EditExchangerAsAdminModal exchanger={exchangerData} onSave={handleEditProfile} /> :
      <EditExchangerModal exchanger={exchangerData} onSave={handleEditProfile} closeModal={closeModal} />
    showModal(editModal)
  }

  if (!exchangerData) {
    return <LoadingAnimation/>
  }

  const isAdmin = getRole() == roles.ADMIN

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-red-500 to-blue-500">
        <header className="py-8 px-6 md:px-12 mt-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Avatar name={exchangerData.name} size="48" round={true} />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{exchangerData.name}</h1>
                <p className="text-sm">@{exchangerData.email}</p>
              </div>
            </div>
            {
              (!id || isAdmin) &&
              <button onClick={showEditModal} className="text-black hover:bg-black/20 border border-black py-2 px-4 rounded">
                Editar Perfil
              </button>
            }
          </div>
        </header>
      </div>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Informacion Personal</h2>
            {
              !id &&
              <div className="mb-4">
                <img src={`data:image/jpeg;base64,${exchangerData.photo}`} alt={exchangerData.name} className="w-full rounded" />
              </div> 
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                //{ title: "Location", value: exchangerData.name, color: "text-red-500" },
                { title: "Name", value: exchangerData.name, color: "text-red-500" },
                { title: "Email", value: exchangerData.email, color: "text-red-500" },
                { title: "DNI", value: exchangerData.dni, color: "text-blue-500" },
                { title: "Phone", value: exchangerData.phone, color: "text-blue-500" },
                { title: "Stars", value: exchangerData.stars + "/10", color: "text-blue-500" },
                { title: "Absentees", value: exchangerData.absentees, color: "text-red-500" },
                { title: "Birthdate", value: formatDate(exchangerData.birthdate), color: "text-red-500" },
              ].filter(field => {
                if(!id || isAdmin) {
                  return true
                }
                return ["Email", "DNI", "Phone"].includes(field.title) === false
              })
              .map((info, idx) => (
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
                : inventory.map((product, index) => (
                  <ProductCard key={index} product={product} hiddeBtns={true} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comentarios</h2>
            <div className="space-y-4">
              {!(reviews) || reviews.length == 0 ?
                <div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">No hay elementos</p>
                </div> : <p>TODO: HACER REVIEWS</p>
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}