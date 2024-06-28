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
import RoutesHandler from "src/utils/routesHandler";
import EditProfileModal from "src/components/modals/EditProfile";
import ReviewCard from "../components/ReviewCard";

export default function Profile({ id }: ProfileProps) {
  const [userData, setUserData] = useState<ExchangerData>();
  const [reviews, setReviews] = useState<Review[]>();
  const [info, setInfo] = useState(null)
  const user = User();
  const userId = user.getId();
  const [contextUserData, setContextUserData] = useState<ExchangerData>();

  const { getRole, logout } = User()
  const { showModal } = useCustomModal()
  const { getId } = RoutesHandler()
  
  const resetReviews = (error: number) => error && setReviews([])

  useEffect(() => {
    getProfile()
    getReviews()
  }, [id]);

  const getProfile = () => {
    if (id) getData(`${endPoints.otherProfile}${id}`).then(userData => setUserData(userData))
    
    getData(`${endPoints.profile}`).then(userData => { 
      if(!id) setUserData(userData)
      setContextUserData(userData)
    })
  }
  const getReviews = () => getData(`${id ? `${endPoints.reviews}${id}` : `${endPoints.reviews}${userId}`}`).then(reviews => setReviews(reviews)).catch(error => resetReviews(error))

  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory', id],
    queryFn: () => fetch(`${serverAddress}/${endPoints.inventory}${id ? `/${id}` : ''}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  function handleEditProfile(newData: ExchangerData) {
    return putData(`${endPoints.exchanger}/${userData.id}`, null, {
      ...newData,
      email: userData.email
    })
    .then(data => setUserData(data))
  }

  const isAdmin = getRole() == roles.ADMIN
  
  const showEditModal = () => showModal(<EditProfileModal campos={isAdmin ? getAdminFields(userData) : getExchangerFields(userData)} onSave={handleEditProfile} />)

  useEffect(() => userData && setInfo(getProfileInfo()), [userData])

  const getProfileInfo = (): UserInfoFields[] => {
    const profileInfo = [
      { title: "Nombre completo", value: userData.name, color: "text-red-500" },
      { title: "Correo electronico", value: userData.email, color: "text-red-500" },
      { title: "DNI", value: userData.dni, color: "text-blue-500" },
      { title: "Telefono", value: userData.phone, color: "text-blue-500" },
      { title: "Estrellas", value: <Rating qty={userData.stars}/>, color: "text-blue-500" },
      { title: "Inasistencias", value: userData.absentees, color: "text-red-500" },
      { title: "Fecha de nacimiento", value: formatDate(userData.birthdate), color: "text-red-500" },
    ]
    return (id && !isAdmin) ? profileInfo.filter(field => !["Correo electronico", "DNI", "Telefono"].includes(field.title)) : profileInfo
  }

  function handleBan() {
    deleteData(`${endPoints.exchanger}/ban/${userData.id}`)
  }

  function handleDelete() {
    deleteData(`${endPoints.exchanger}/${userData.id}`)
      .then(() => {
        if(canDoActions) return //TODO: Si sos admin que te redirija al apartado de intercambiadores o ayudante (depende de a cual elimino)
        logout()
      })
  }

  const canDoActions = !getId() || isAdmin

  return (
    <UserProfile
      userData={userData}
      profileInfo={info}
      handleEdit={canDoActions ? showEditModal : null}
      showPhoto={canDoActions}
      handleDelete={handleDelete}
      canDeletePhoto={!!(!getId() && userData?.photo)}
      canEdit={canDoActions}
      canDelete={canDoActions}
      canBan={isAdmin}
      handleBan={handleBan}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Publicaciones de productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {
        (!inventory || inventory.length == 0) ?
          <p className="text-gray-400 line-clamp-2">No hay elementos</p>
        :
          inventory.map(item => <ItemCard userStars={contextUserData?.stars} key={item.id} item={item} canEdit={false} canDelete={false} hiddeBtns={canDoActions} hiddeOwner={true} />)
      }
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">Reseñas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        (!reviews || reviews.length == 0) ?
        <p className="text-gray-400 line-clamp-2">No hay elementos</p> 
        :
        reviews.map(review => <ReviewCard key={review.id} review={review} />)
      }
      </div>
    </UserProfile>
  )
}