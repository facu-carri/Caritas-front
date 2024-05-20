/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react";
import { User } from "src/libs/User";
import { roles, routes } from "src/libs/constants";
import RoutesHandler from "src/libs/routesHandler";

const AuthEmployeeContext = React.createContext(undefined)

export function useAuthExmployee(){
  return useContext(AuthEmployeeContext)
}

export default function AuthEmployeeProvider({ children }) {

    const { getRole, getAuth } = User()
    const [auth, setAuth] = useState(null)
    const { setRoute } = RoutesHandler()

    const validRole = () => {
        const _rol = getRole()
        return _rol == roles.HELPER || _rol == roles.ADMIN
    }

    useEffect(() => {
        const auth = getAuth()
        if (validRole() && auth) {
            setAuth(auth)
        } else {
            setRoute(routes.auth)
        }
    }, [])

    return (
        <AuthEmployeeContext.Provider value=''>
            {auth != null ? children : null}
        </AuthEmployeeContext.Provider>
    )
}