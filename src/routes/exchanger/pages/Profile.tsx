/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import { deleteData, getData, getHeaders, putData } from "src/utils/request/httpRequests";
import { endPoints, roles, serverAddress } from "src/utils/constants";
import { useEffect, useState } from 'react';
import { useCustomModal } from 'src/context/CustomModalContext';
import { User } from 'src/utils/User';
import { ExchangerData, Review, UserInfoFields } from 'src/types/Types';
import { formatDate } from 'src/utils/api';
import ItemCard from '../components/ItemCard';
import { ProfileProps } from 'src/types/PropsTypes';
import UserProfile from "src/components/UserProfile";
import Rating from "src/components/Rating";
import { getAdminFields, getExchangerFields } from "src/routes/admin/components/ExchangerFields";
import EditExchangerModal from "src/components/modals/EditExchanger";
import RoutesHandler from "src/utils/routesHandler";

export default function Profile({ id }: ProfileProps) {
  const [userData, setUserData] = useState<ExchangerData>();
  const [reviews, setReviews] = useState<Review[]>();
  const [info, setInfo] = useState(null)

  const { getRole, logout } = User()
  const { showModal, closeModal } = useCustomModal()
  const { setRoute, getId } = RoutesHandler()
  
  const resetReviews = (error: number) => error && setReviews([])

  useEffect(() => {
    getProfile()
    getReviews()
  }, [id]);

  const getProfile = () => getData(`${id ? `${endPoints.otherProfile}${id}` : endPoints.profile}`).then(userData => setUserData(userData))
  const getReviews = () => getData(endPoints.myReviews).then(reviews => setReviews(reviews)).catch(error => resetReviews(error))

  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory', id],
    queryFn: () => fetch(`${serverAddress}/${endPoints.inventory}${id ? `/${id}` : ''}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  function handleEditProfile(newData: ExchangerData) {
    let errorCode: number
    putData(`${endPoints.exchanger}/${userData.id}`, null, {
      ...newData,
      email: userData.email
    })
    .then(data => setUserData(data))
    .catch(err => errorCode = err)
    
    if (errorCode) throw new Error(errorCode.toString())
    else closeModal()
  }

  const isAdmin = getRole() == roles.ADMIN
  
  const showEditModal = () => showModal(<EditExchangerModal campos={isAdmin ? getAdminFields(userData) : getExchangerFields(userData)} onSave={handleEditProfile} />)

  useEffect(() => userData && setInfo(getProfileInfo()), [userData])

  const getProfileInfo = (): UserInfoFields[] => {
    const profileInfo = [
      { title: "Nombre", value: userData.name, color: "text-red-500" },
      { title: "Correo electronico", value: userData.email, color: "text-red-500" },
      { title: "DNI", value: userData.dni, color: "text-blue-500" },
      { title: "Telefono", value: userData.phone, color: "text-blue-500" },
      { title: "Estrellas", value: <Rating qty={userData.stars}/>, color: "text-blue-500" },
      { title: "Inasistencias", value: userData.absentees, color: "text-red-500" },
      { title: "Fecha de nacimiento", value: formatDate(userData.birthdate), color: "text-red-500" },
    ]
    return (id && !isAdmin) ? profileInfo.filter(field => !["Correo electronico", "DNI", "Telefono"].includes(field.title)) : profileInfo
  }

  function handleDelete() {
    getData(`exchanger/myProfile`)
      .then(({ id: profileId }) => {
        deleteData(`${endPoints.exchanger}/${profileId}`, null)
          .then(logout)
      })
  }

  const canDoActions =  !getId() || getRole() == roles.ADMIN

  return (
    <UserProfile
      userData={userData}
      profileInfo={info}
      handleEdit={!id || isAdmin ? showEditModal : null}
      showPhoto={!id || isAdmin}
      handleDelete={handleDelete}
      canDeletePhoto={!!(!getId() && userData?.photo)}
      canEdit={canDoActions}
      canDelete={canDoActions}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Publicaciones de productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {
        (!inventory || inventory.length == 0) ?
          <p className="text-gray-400 line-clamp-2">No hay elementos</p>
        :
          inventory.map(item => <ItemCard key={item.id} item={item} hiddeBtns={true} hiddeOwner={!!id} />)
      }
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">Comentarios</h2>
      <div className="space-y-4">
      {
        (!reviews || reviews.length == 0) ?
        <p className="text-gray-400 line-clamp-2">No hay elementos</p> :
        <p> TODO: HACER REVIEWS </p>
      }
      </div>
    </UserProfile>
  )
}