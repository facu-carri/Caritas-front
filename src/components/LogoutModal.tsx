import { useRef } from "react"
import { useLogout } from "src/context/LogoutContext"
import Button from "./Button"
import { User } from "src/utils/User"

export default function LogoutModal() {
    
    const modalRef = useRef(null)
    const { showLogoutModal, setShowLogoutModal } = useLogout()
    const { logout } = User()

    const handleClickModal = (ev) => {
        const target = ev.target
        if (target.id && target.id == modalRef.current.id) {
            setShowLogoutModal(false)
        }
      }

    return (
        <dialog className="modal bg-gray-500/50" id='registerModal' open={showLogoutModal} onClick={handleClickModal} ref={modalRef}>
            <div className="modal-box flex justify-center items-center text-[100%]">
                <h3 className="font-bold text-lg">Confirma el cierre de la sesion?</h3>
                <div className="flex flex-row gap-4">
                    <Button onClick={() => setShowLogoutModal(false)}>Cancelar</Button>
                    <Button onClick={() => logout()}>Aceptar</Button>
                </div>
            </div>
        </dialog>
    )
}