/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useRef, useState } from "react";
import { CustomModalContextType } from "src/types/ContextTypes";
import { MouseEvent } from "src/types/Types";

const customModalContext = React.createContext<CustomModalContextType>(undefined)

export function useCustomModal(){
  return useContext(customModalContext)
}

export default function CustomModalProvider({ children }) {

    const dialogRef = useRef(null);
    const [modals, setModals] = useState([]); // Usar un array para manejar múltiples modales
    const [block, setBlock] = useState(false); // Usar un bloqueo para evitar que se cierre el modal
    const dialogElement = () => dialogRef.current;

    const showModal = (modalContent: JSX.Element, onCloseFn?: () => void) => {
        setModals(prevModals => [...prevModals, { content: modalContent, onClose: onCloseFn }]);
        dialogElement()?.showModal();
    };

    const closeModal = () => {
        setBlock(false)
        setModals(prevModals => {
            const modalsCopy = [...prevModals]
            const lastModal = modalsCopy.pop()
            if (lastModal?.onClose) lastModal.onClose()
            return modalsCopy
        });
        if (modals.length <= 1) dialogElement()?.close()
    };

    const handleClickOutside = (ev: MouseEvent) => {
        if(block) return
        if (ev.target == ev.currentTarget) closeModal()
    }

    return (
        <customModalContext.Provider value={{ showModal, setBlock, closeModal }}>
            <dialog
                className="modal bg-black/50 flex justify-center items-center h-[100vh] text-[100%]"
                id={'customModal'}
                onClose={closeModal}
                onMouseDown={handleClickOutside}
                ref={dialogRef}
            >
                {modals.map((modal, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center h-full z-[10+${index}]`}
                        onClick={handleClickOutside}>
                        {modal.content}
                    </div>
                ))}
            </dialog>
            {children}
        </customModalContext.Provider>
    )
}