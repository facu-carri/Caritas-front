/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { CustomModalContextType } from "src/types/TypeContext";

const customModalContext = React.createContext<CustomModalContextType>(undefined)

export function useCustomModal(){
  return useContext(customModalContext)
}

export default function CustomModalProvider({ children }) {

    const [modal, setModal] = useState(null)

    return (
        <customModalContext.Provider value={{ modal, setModal }}>
            {modal}
            <dialog id="modalId">
            </dialog>
            {children}
        </customModalContext.Provider>
    )
}