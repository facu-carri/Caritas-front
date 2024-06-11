import Avatar from "react-avatar";
import LoadingAnimation from "./LoadingAnimation";
import { UserProfileProps } from "src/types/PropsTypes";
import Image from "./Image";
import { endPoints } from "src/utils/constants";
import { putData } from "src/utils/request/httpRequests";
import ConfirmationModal from "./modals/Confirmation";
import { useCustomModal } from "src/context/CustomModalContext";
import { useState } from "react";

export default function UserProfile({ userData, profileInfo, showPhoto, canDeletePhoto, canEdit, handleEdit, canDelete, handleDelete, canBan, handleBan, children }: UserProfileProps) {
    
    const { showModal } = useCustomModal()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeletePhoto = () => {
        setIsDeleting(true)
        putData(`${endPoints.exchanger}/${userData.id}`, null, { ...userData, photo: '' })
        .then(() => {
            userData.photo = ''
            setIsDeleting(false)
        })
    }

    const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)

    return (!userData || !profileInfo) ? <LoadingAnimation /> :
    (
        <div className="bg-gray-900 min-h-screen">
            <header className="flex flex-row gap-2 py-5 px-6 md:px-12 pt-[100px] bg-gradient-to-r from-red-500 to-blue-500 ">
                <div className="flex flex-row items-center justify-center space-x-4">
                <div className="mt-1 h-14 w-14 max-w-14 max-h-14 mask mask-circle rounded-full overflow-hidden flex items-center">
                    {
                        showPhoto && userData.photo ?
                        <Image className="select-none" photo={userData.photo} alt={userData.name} />
                        :
                        <Avatar className="select-none" name={userData.name} size="56" round={true} />
                    }
                    </div>
                    <div className="text-white flex flex-col justify-center mt-1">
                        <h1 className="text-2xl font-bold">{userData.name}</h1>
                        {userData.email && <p className="text-sm">{userData.email}</p>}
                    </div>
                </div>
                { canDeletePhoto && !isDeleting && 
                    <button onClick={() => confirmation(handleDeletePhoto)} disabled={isDeleting} className="mb-2 mt-5 ml-2 py-2 px-4 rounded text-black hover:bg-black/20 border border-black">Borrar foto</button>
                }
                { canDelete &&
                    <button onClick={() => confirmation(handleDelete)} className="mb-2 mt-5 ml-2 py-2 px-4 rounded text-black hover:bg-black/20 border border-black">Borrar perfil</button>
                }
                { canBan &&
                    <button onClick={() => confirmation(handleBan)} className="mb-2 mt-5 ml-2 py-2 px-4 rounded text-black hover:bg-black/20 border border-black">Suspender</button>
                }
                { canEdit && 
                    <button onClick={handleEdit} className="mb-2 mt-5 ml-2 py-2 px-4 rounded text-black hover:bg-black/20 border border-black">Editar</button>
                }
            </header>
            <section className="py-8 md:px-12 grid gap-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Informacion Personal</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {
                    profileInfo.map((info, index) => (
                        <div key={`info-${index}`} className="bg-gray-800 rounded-lg shadow p-4">
                            <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                            <div className="text-gray-400">{info.value}</div>
                        </div>
                    ))
                }
                </div>
                {children}
            </section>
        </div>
    )
}