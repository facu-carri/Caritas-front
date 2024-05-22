import { useRef } from "react"
import { useLogout } from "src/context/LogoutContext"
import Button from "../Button"
import { User } from "src/libs/User"

export default function ConfirmationModal({ onAccept, onCancel }) {
    
    const modalRef = useRef(null)
    const { showModal, setShowModal } = useConfirmation()

    const handleClickModal = (ev) => {
        const target = ev.target
        if (target.id && target.id == modalRef.current.id) {
            setShowModal(false)
        }
      }

    return (
        <dialog className="modal bg-gray-500/50" id='registerModal' open={showModal} onClick={handleClickModal} ref={modalRef}>
            <div className="modal-box flex justify-center items-center text-[100%]">
                <h3 className="font-bold text-lg">¿Estás seguro de que quieres proceder? Esta acción no se puede deshacer.</h3>
                <div className="flex flex-row gap-4">
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button onClick={onAccept}>Aceptar</Button>
                </div>
            </div>
        </dialog>
    )
}