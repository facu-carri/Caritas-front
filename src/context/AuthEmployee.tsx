/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react";
import AuthenticationCodeInput from "src/routes/login/AuthenticationCodeInput";
import { User } from "src/libs/User";
import { useAuth } from "./AuthContext";

const AuthEmployeeContext = React.createContext(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const { token } = useAuth()

    console.log(token)
    return (
        <AuthEmployeeContext.Provider value=''>
            {
                token === 'null' ?
                <AuthenticationCodeInput/>
                :
                children
            }
        </AuthEmployeeContext.Provider>
    )
}