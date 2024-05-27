import Avatar from "react-avatar";
import LoadingAnimation from "./LoadingAnimation";
import RoutesHandler from "src/utils/routesHandler";
import { UserProfileProps } from "src/types/PropsTypes";

export default function UserProfile({ userData, profileInfo, showPhoto, handleEdit, children }: UserProfileProps) {
    
    const { getId } = RoutesHandler()

    const id = !isNaN(parseInt(getId())) ? getId() : null

    const getProfileInfo = () => {
        return (
            profileInfo.map((info, index) => (
                <div key={`info-${index}`} className="bg-gray-800 rounded-lg shadow p-4">
                    <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                </div>
            ))
        )
    }

    return (!userData || !profileInfo) ? <LoadingAnimation /> :
    (
        <div className="bg-gray-900 min-h-screen">
            <header className="py-5 px-6 md:px-12 pt-[100px] bg-gradient-to-r from-red-500 to-blue-500 ">
                <div className="flex space-x-4">
                    <div className="h-16 w-16 mask mask-circle">
                    {
                        showPhoto ? <img src={`data:image/jpeg;base64,${userData.photo}`} alt={userData.name}/> :
                        <Avatar name={userData.name} size="48" round={true}/>
                    }
                    </div>
                    <div className="text-white mt-2">
                        <h1 className="text-2xl font-bold">{userData.name}</h1>
                        <p className="text-sm">@{userData.email}</p>
                    </div>
                </div>
                {
                    (!id && !!handleEdit) && <button onClick={handleEdit} className="mt-4 text-black hover:bg-black/20 border border-black py-2 px-4 rounded">Editar Perfil</button>
                }
            </header>
            <section className="py-8 md:px-12 grid gap-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Informacion Personal</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {
                    getProfileInfo()
                }
                </div>
                {children}
            </section>
        </div>
    )
}