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
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState(defaultDialogId)

    const dialogElement = () => dialogRef?.current ? (dialogRef?.current as HTMLDialogElement) : null

    const showModal = (modalContent: JSX.Element, id: string) => {
        setModal(modalContent)
        if(id) setId(id)
        dialogElement()?.showModal()
        setOpen(true)
    }

    const closeModal = () => {
        dialogElement()?.close()
        setModal(null)
        setOpen(false)
        setId(defaultDialogId)
    }

    const handleClickOutside = (ev:any) => {
        const target = ev.target
        if (target.id && target.id == dialogRef.current.id) closeModal()
    }

    return (
        <customModalContext.Provider value={{ showModal, isOpen, dialogId: id, closeModal }}>
            <dialog className="modal bg-gray-500/50" id={id} open={isOpen} onClick={handleClickOutside} ref={dialogRef}>
                {modal}
            </dialog>
            {children}
        </customModalContext.Provider>
    )
}