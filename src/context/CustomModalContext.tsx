/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useRef, useState } from "react";
import { CustomModalContextType } from "src/types/ContextTypes";

const customModalContext = React.createContext<CustomModalContextType>(undefined)

export function useCustomModal(){
  return useContext(customModalContext)
}

export default function CustomModalProvider({ children }) {

    const defaultDialogId = 'customModal'
    const dialogRef = useRef(null)
    const [modal, setModal] = useState(null)
    const [onClose, setOnClose] = useState<() =>void>(null)

    const dialogElement = () => dialogRef?.current ? (dialogRef?.current as HTMLDialogElement) : null

    const showModal = (modalContent: JSX.Element, onCloseFn: () => void) => {
        if(onClose) onClose()
        setModal(modalContent)
        if(onCloseFn) setOnClose(onCloseFn)
        dialogElement()?.showModal()
    }

    const closeModal = () => {
        dialogElement()?.close()
        setModal(null)
    }

    const handleClickOutside = (ev:any) => {
        const target = ev.target
        if (target.id && target.id == dialogRef.current.id) closeModal()
    }

    return (
        <customModalContext.Provider value={{ showModal, closeModal }}>
            <dialog className="modal bg-gray-500/50" id={defaultDialogId} onClose={closeModal} onClick={handleClickOutside} ref={dialogRef}>
                {modal}
            </dialog>
            {children}
        </customModalContext.Provider>
    )
}