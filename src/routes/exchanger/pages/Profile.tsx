/* eslint-disable react-hooks/exhaustive-deps */
import { deleteData, getData, putData } from "src/utils/request/httpRequests";
import { endPoints, roles, routes } from "src/utils/constants";
import { useEffect, useState } from 'react';
import { useCustomModal } from 'src/context/CustomModalContext';
import { User } from 'src/utils/User';
import { ExchangerData, ItemData, Review, UserInfoFields } from 'src/types/Types';
import { formatDate } from 'src/utils/api';
import ItemCard from '../components/ItemCard';
import { ProfileProps } from 'src/types/PropsTypes';
import UserProfile from "src/components/UserProfile";
import Rating from "src/components/Rating";
import { getAdminFields, getExchangerFields } from "src/routes/admin/components/ExchangerFields";
import EditExchangerModal from "src/components/modals/EditExchanger";
import RoutesHandler from "src/utils/routesHandler";

export default function Profile({ id }: ProfileProps) {
    const [exchangerData, setUserData] = useState<ExchangerData>();
    const [inventory, setInventory] = useState<ItemData[]>();
    const [reviews, setReviews] = useState<Review[]>();
    const [info, setInfo] = useState(null)

    const { getRole, logout } = User()
    const { showModal, closeModal } = useCustomModal()
    const { setRoute, getId } = RoutesHandler()
    
    const resetInvetory = (error: number) => error == 404 && setInventory([])
    const resetReviews = (error: number) => error && setReviews([])

    useEffect(() => {
        getProfile()
        getInventory()
        getReviews()
    }, [id]);

    const getProfile = () => getData(`${id ? `${endPoints.otherProfile}${id}` : endPoints.profile}`).then(exchangerData => setUserData(exchangerData))
    const getInventory = () => getData(`${id ? `${endPoints.inventory}/${id}` : endPoints.inventory }`).then(inventory => setInventory(inventory)).catch(error => resetInvetory(error))
    const getReviews = () => getData(endPoints.myReviews).then(reviews => setReviews(reviews)).catch(error => resetReviews(error))

    function handleEditProfile(newData: ExchangerData) {
        let errorCode: number
        putData(`${endPoints.exchanger}/${exchangerData.id}`, null, {
            ...newData,
            email: exchangerData.email
        })
        .then(data => setUserData(data))
        .catch(err => errorCode = err)
        
        if (errorCode) throw new Error(errorCode.toString())
        else closeModal()
    }

    const isAdmin = getRole() == roles.ADMIN
    
    const showEditModal = () => showModal(<EditExchangerModal campos={isAdmin ? getAdminFields(exchangerData) : getExchangerFields(exchangerData)} onSave={handleEditProfile} />)

    useEffect(() => exchangerData && setInfo(getProfileInfo()), [exchangerData])

    const getProfileInfo = (): UserInfoFields[] => {
        const profileInfo = [
            { title: "Nombre", value: exchangerData.name, color: "text-red-500" },
            { title: "Correo electronico", value: exchangerData.email, color: "text-red-500" },
            { title: "DNI", value: exchangerData.dni, color: "text-blue-500" },
            { title: "Telefono", value: exchangerData.phone, color: "text-blue-500" },
            { title: "Estrellas", value: <Rating qty={exchangerData.stars}/>, color: "text-blue-500" },
            { title: "Inasistencias", value: exchangerData.absentees, color: "text-red-500" },
            { title: "Fecha de nacimiento", value: formatDate(exchangerData.birthdate), color: "text-red-500" },
        ]
        return (id && !isAdmin) ? profileInfo.filter(field => !["Correo electronico", "DNI", "Telefono"].includes(field.title)) : profileInfo
    }

    function handleDelete() {
        deleteData(`${endPoints.exchanger}/${id}`, null)
        .then(() => {
            if(!id) logout()
            else setRoute(routes.main)
        })
    }

    const canDoActions =  !getId() || getRole() == roles.ADMIN

    return (
        <UserProfile
            userData={exchangerData}
            profileInfo={info}
            handleEdit={!id || isAdmin ? showEditModal : null}
            showPhoto={!id || isAdmin}
            handleDelete={handleDelete}
            canDeletePhoto={!getId()}
            canEdit={canDoActions}
            canDelete={canDoActions}
        >
            <h2 className="text-2xl font-bold mb-4 text-white">Publicaciones de productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
                (!inventory || inventory.length == 0) ?
                <p className="text-gray-400 line-clamp-2">No hay elementos</p>:
                inventory.map((item, index) => (<ItemCard key={index} item={item} hiddeBtns={true} hiddeOwner={!!id} />))
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