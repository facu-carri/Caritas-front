import { roles, routes } from "./constants"
import { getItem, removeItem, setItem } from "./localStorage"
import { activateAuth } from "./request/httpRequests"
import RoutesHandler from "./routesHandler"

type UserData = {
    token: string,
    role: string
}

export const User = () => {

    const TOKEN: string = 'token'
    const ROLE: string = 'role'
    const AUTH: string = 'auth'

    const { setRoute } = RoutesHandler()

    const setUser = (data: UserData) => {
        setItem(TOKEN, data.token)
        setItem(ROLE, data.role)
        if(data.role == roles.EXCHANGER) activateAuth()
    }

    const getToken = () => {
        return getItem(TOKEN)
    }

    const getRole = () => {
        return getItem(ROLE)
    }

    const setAuth = (val) => {
        setItem(AUTH, val)
    }

    const getAuth = () => {
        return getItem(AUTH)
    }

    const logout = () => {
        removeItem(TOKEN)
        removeItem(ROLE)
        removeItem(AUTH)
        setRoute(routes.login)
    }

    return { setUser, getToken, getRole, setAuth, getAuth, logout }
}