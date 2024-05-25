import Button from "../Button"
import { User } from "src/utils/User"
import { useCustomModal } from "src/context/CustomModalContext"

export default function LogoutModal() {
    
    const { closeModal } = useCustomModal()
    const { logout } = User()

    return (
        <div className="modal-box flex justify-center items-center text-[100%]">
            <h3 className="font-bold text-lg">Confirma el cierre de la sesion?</h3>
            <div className="flex flex-row gap-4">
                <Button onClick={() => closeModal()}>Cancelar</Button>
                <Button onClick={() => logout()}>Aceptar</Button>
            </div>
        </div>
    )
}