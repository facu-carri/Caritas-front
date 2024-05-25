/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import LogoutModal from "src/components/LogoutModal";
import { LogoutContextType } from "src/types/TypeContext";

const LogoutContext = React.createContext<LogoutContextType>(undefined)

export function useLogout(){
  return useContext(LogoutContext)
}

export default function LogoutProvider({ children }) {

    const [showLogoutModal, setShowLogoutModal] = useState(false)

    return (
        <LogoutContext.Provider value={{ showLogoutModal, setShowLogoutModal }}>
            {showLogoutModal && <LogoutModal/>}
            {children}
        </LogoutContext.Provider>
    )
}