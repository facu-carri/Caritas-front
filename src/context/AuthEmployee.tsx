/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext } from "react";
import { User } from "src/libs/User";
import AuthenticationCodeInput from "src/routes/login/AuthenticationCodeInput";

const AuthEmployeeContext = React.createContext(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const { getAuth } = User()

    return (
        <AuthEmployeeContext.Provider value=''>
            {getAuth() != null ? children : <AuthenticationCodeInput onSubmit={() => {}}/>}
        </AuthEmployeeContext.Provider>
    )
}