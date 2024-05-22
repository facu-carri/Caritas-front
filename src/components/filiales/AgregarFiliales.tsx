/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import AgregarFilialModal from "./AgregarModal";
import { useCustomModal } from "src/context/CustomModalContext";

export default function AgregarFiliales() {
    
    const modalRef = useRef(null)
    const { setModal } = useCustomModal()

    const handleClickModal = (ev) => {
        const target = ev.target
        if (target.id && target.id == modalRef.current.id) setModal(null)
    }

    return (
        <dialog className="modal bg-gray-500/50" id='registerFilial' open={true} onClick={handleClickModal} ref={modalRef}>
            <AgregarFilialModal modalId={'registerFilial'} handleClickModal={handleClickModal}/>
        </dialog>
    )
}