/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react";
import { User } from "src/libs/User";
import { roles, routes } from "src/libs/constants";
import RoutesHandler from "src/libs/routesHandler";

const AuthContext = React.createContext(undefined)

export function useAuth(){
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    const { getToken, getRole } = User()
    const [token, setToken] = useState(null)
    const { setRoute } = RoutesHandler()

    const isValidToken = (token: string) => {
        return token || token == 'null'
    }

    useEffect(() => {
        const _token = getToken()
        const _rol = getRole()
        setToken(_token)
        if (!isValidToken(_token) || !_rol) {
            setRoute(routes.login)
        } else {
            setToken(_token)
        }
    }, [])

    return (
        <AuthContext.Provider value={{token}}>
            {isValidToken(token) ? children : null }
        </AuthContext.Provider>
    )
}