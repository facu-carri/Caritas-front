/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useRef, useState } from "react";
import { CustomModalContextType } from "src/types/ContextTypes";

const customModalContext = React.createContext<CustomModalContextType>(undefined)

export function useCustomModal(){
  return useContext(customModalContext)
}

export default function CustomModalProvider({ children }) {

    const [modal, setModal] = useState(null)
    const dialogRef = useRef(null)

    const dialogElement = () => dialogRef?.current ? (dialogRef?.current as HTMLDialogElement) : null

    const showModal = () => {
        closeModal()
        dialogElement()?.showModal()
    }

    const closeModal = () => dialogElement()?.close()
        
    const handleClickOutside = (ev:any) => {
        const target = ev.target
        if (target.id && target.id == dialogRef.current.id) closeModal()
    }
    
    const setModalContent = (modalContent) => {
        setModal(modalContent)
        showModal()
    }

    useEffect(() => closeModal(), [])

    return (
        <customModalContext.Provider value={{ setModal: setModalContent, showModal, closeModal }}>
            <dialog className="modal bg-gray-500/50" id='customModal' onClick={handleClickOutside} ref={dialogRef}>
                {modal}
            </dialog>
            {children}
        </customModalContext.Provider>
    )
}