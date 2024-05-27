/* eslint-disable react-hooks/exhaustive-deps */
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints, roles } from "src/utils/constants";
import { useEffect, useState } from 'react';
import EditExchangerModal from '../../../components/modals/EditExchanger';
import { useCustomModal } from 'src/context/CustomModalContext';
import { User } from 'src/utils/User';
import EditExchangerAsAdminModal from 'src/routes/admin/components/EditExchangerAsAdminModal';
import { ExchangerData, ItemData, Review, UserInfoFields } from 'src/types/Types';
import { formatDate } from 'src/utils/api';
import ItemCard from '../components/ItemCard';
import { ProfileProps } from 'src/types/PropsTypes';
import UserProfile from 'src/components/Profile';

export default function Profile({ id }: ProfileProps) {
    const [exchangerData, setUserData] = useState<ExchangerData>();
    const [inventory, setInventory] = useState<ItemData[]>();
    const [reviews, setReviews] = useState<Review[]>();
    const { getRole } = User()
    const { showModal, closeModal } = useCustomModal()
    const [info, setInfo] = useState(null)
    const resetInvetory = (error: number) => error == 404 && setInventory([])
    const resetReviews = (error: number) => error && setReviews([])

    useEffect(() => {
        getData(`${id ? `${endPoints.otherProfile}${id}` : endPoints.profile}`).then(exchangerData => setUserData(exchangerData));
        getData(`${id ? `${endPoints.inventory}/${id}` : endPoints.inventory }`).then(inventory => setInventory(inventory)).catch(error => resetInvetory(error));
        getData(endPoints.myReviews).then(reviews => setReviews(reviews)).catch(error => resetReviews(error));
    }, [id]);

    function handleEditProfile(newData:ExchangerData) {
        putData(`${endPoints.exchanger}/${exchangerData.id}`, null, {
        ...newData,
        email: exchangerData.email
        }).then(res => console.log(res))
    }

    const isAdmin = getRole() == roles.ADMIN
    
    function showEditModal() {
        const editModal = isAdmin ?
        <EditExchangerAsAdminModal exchanger={exchangerData} onSave={handleEditProfile} /> :
        <EditExchangerModal exchanger={exchangerData} onSave={handleEditProfile} closeModal={closeModal} />
        showModal(editModal)
    }

    useEffect(() => exchangerData && setInfo(getProfileInfo()), [exchangerData])

    const getProfileInfo = (): UserInfoFields[] => {
        const profileInfo = [
            { title: "Name", value: exchangerData.name, color: "text-red-500" },
            { title: "Email", value: exchangerData.email, color: "text-red-500" },
            { title: "DNI", value: exchangerData.dni, color: "text-blue-500" },
            { title: "Phone", value: exchangerData.phone, color: "text-blue-500" },
            { title: "Stars", value: exchangerData.stars + "/10", color: "text-blue-500" },
            { title: "Absentees", value: exchangerData.absentees, color: "text-red-500" },
            { title: "Birthdate", value: formatDate(exchangerData.birthdate), color: "text-red-500" },
        ]
        return (id || !isAdmin) ? profileInfo.filter(field => !["Email", "DNI", "Phone"].includes(field.title)) : profileInfo
    }

  return (
        <UserProfile userData={exchangerData} profileInfo={info} handleEdit={showEditModal}>
            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Publicaciones de productos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    !(inventory) || inventory.length == 0 ?
                    <p className="text-gray-400 line-clamp-2">No hay elementos</p>:
                    inventory.map((item, index) => (<ItemCard key={index} item={item} hiddeBtns={true} />))
                }
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Comentarios</h2>
                <div className="space-y-4">
                {
                    !(reviews) || reviews.length == 0 ?
                    <p className="text-gray-400 line-clamp-2">No hay elementos</p> :
                    <p> TODO: HACER REVIEWS </p>
                }
                </div>
            </section>
        </UserProfile>
    )
}