import { routes } from "./constants"
import { getItem, removeItem, setItem } from "./localStorage"
import RoutesHandler from "./routesHandler"

type UserData = {
    token: string,
    role: string
}

export const User = () => {

    const TOKEN: string = 'token'
    const ROLE: string = 'role'
    const { setRoute } = RoutesHandler()

    const setUser = (data: UserData) => {
        setItem(TOKEN, data.token)
        setItem(ROLE, data.role)
        setRoute(routes.main)
    }
    
    const getToken = () => {
        return getItem(TOKEN)
    }

    const getRole = () => {
        return getItem(ROLE)
    }

    const logout = () => {
        removeItem(TOKEN)
        removeItem(ROLE)
        setRoute(routes.login)
    }

    return { setUser, getToken, getRole, logout }
}