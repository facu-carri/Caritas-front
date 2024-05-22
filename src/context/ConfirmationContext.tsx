/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import LogoutModal from "src/components/LogoutModal";
import { ConfirmationContextType } from "./types/Confirmation";
import ConfirmationModal from "src/components/helper/GenericConfirmationModal";

const ConfirmationContext = React.createContext<ConfirmationContextType>(undefined)

export function useConfirmation(){
  return useContext(ConfirmationContext)
}

export default function ConfirmationProvider({ children }) {

    const [showModal, setShowModal] = useState(false)

    return (
        <ConfirmationContext.Provider value={{ showModal, setShowModal }}>
            {showModal && <ConfirmationModal/>}
            {children}
        </ConfirmationContext.Provider>
    )
}