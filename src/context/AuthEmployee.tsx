/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect } from "react";
import AuthenticationCodeInput from "src/routes/login/AuthenticationCodeInput";
import { User } from "src/libs/User";
import { activateAuth } from "src/libs/request/httpRequests";

const AuthEmployeeContext = React.createContext(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const { getAuth } = User()
    
    useEffect(() => {
        if (getAuth()) {
            activateAuth()
        }
    }, [])

    return (
        <AuthEmployeeContext.Provider value=''>
            {getAuth() != null ? children : <AuthenticationCodeInput/>}
        </AuthEmployeeContext.Provider>
    )
}