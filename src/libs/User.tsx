import { routes } from "./constants"
import { getItem, removeItem, setItem } from "./localStorage"
import RoutesHandler from "./routesHandler"

type UserData = {
    token: string,
    rol: string
}

export const User = () => {

    const TOKEN: string = 'token'
    const ROL: string = 'rol'
    const { setRoute } = RoutesHandler()

    const setUser = (data: UserData) => {
        setItem(TOKEN, data.token)
        setItem(ROL, data.rol)
        setRoute(routes.main)
    }
    
    const getToken = () => {
        return getItem(TOKEN)
    }

    const getRol = () => {
        return getItem(ROL)
    }

    const logout = () => {
        removeItem(TOKEN)
        setRoute(routes.main)
    }

    return { setUser, getToken, getRol, logout }
}