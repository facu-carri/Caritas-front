/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { LogoutContextType } from "../types/context/Logout";
import LogoutModal from "src/components/LogoutModal";

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