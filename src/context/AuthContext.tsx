/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react";
import { User } from "src/utils/User";
import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";

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

    const isUserAuthenticated = (_token:string) => {
        const _rol = getRole()
        return _rol && isValidToken(_token)
    }

    useEffect(() => {
        const _token = getToken()
        if (isUserAuthenticated(_token)) {
            setToken(_token)
        } else {
            setRoute(routes.login)
        }
    }, [])

    return (
        <AuthContext.Provider value={{token}}>
            {isValidToken(token) ? children : null }
        </AuthContext.Provider>
    )
}