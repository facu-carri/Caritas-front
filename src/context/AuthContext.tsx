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

    const isValidToken = (token: string, role: string) => {
        return token != 'null'
    }

    useEffect(() => {
        const _token = getToken()
        const _rol = getRole()
        setToken(_token)
        if (!isValidToken(_token, _rol) || !_rol) {
            console.log('token is invalid', _token, _rol)
            if(_rol === roles.ADMIN || _rol === roles.EXCHANGER) {
                return;
            }
            setRoute(routes.login)
        } else {
            setToken(_token)
        }
    }, [])

    return (
        <AuthContext.Provider value={{token}}>
            {token === "null" ? null : children }
        </AuthContext.Provider>
    )
}