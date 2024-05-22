/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import { useCustomModal } from "src/context/CustomModalContext";
import EliminarFilialModal from "./EliminarModal";

export default function EliminarFiliales() {
    
    const modalRef = useRef(null)
    const { setModal } = useCustomModal()

    const handleClickModal = (ev) => {
        const target = ev.target
        if (target.id && target.id == modalRef.current.id) setModal(null)
    }

    return (
        <dialog className="modal bg-gray-500/50" id='eliminarFilial' open={true} onClick={handleClickModal} ref={modalRef}>
            <EliminarFilialModal closeModal={handleClickModal}/>
        </dialog>
    )
}