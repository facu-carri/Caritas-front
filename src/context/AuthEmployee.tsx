/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext } from "react";
import AuthenticationCodeInput from "src/routes/login/AuthenticationCodeInput";
import { User } from "src/libs/User";

const AuthEmployeeContext = React.createContext(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const { getToken } = User()

    return (
        <AuthEmployeeContext.Provider value=''>
            {getToken() == 'null' ? <AuthenticationCodeInput/> : children}
        </AuthEmployeeContext.Provider>
    )
}