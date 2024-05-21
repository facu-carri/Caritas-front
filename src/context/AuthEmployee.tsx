/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import AuthenticationCodeInput from "src/routes/login/AuthenticationCodeInput";
import { AuthEmployeeContextType } from "./types/AuthEmployee";

const AuthEmployeeContext = React.createContext<AuthEmployeeContextType>(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const [auth, setAuth] = useState(true)// CAMBIAR

    return (
        <AuthEmployeeContext.Provider value={{auth, setAuth}}>
            {auth ? children : <AuthenticationCodeInput/>}
        </AuthEmployeeContext.Provider>
    )
}