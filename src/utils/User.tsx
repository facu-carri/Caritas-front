import { roles, routes } from "./constants"
import { getItem, removeItem, setItem } from "./localStorage"
import RoutesHandler from "./routesHandler"

type UserData = {
    token: string,
    role: string,
    id: string
}

export const User = () => {

    const TOKEN: string = 'token'
    const ROLE: string = 'role'
    const ID: string = 'id'

    const { setRoute } = RoutesHandler()

    const setUser = (data: UserData) => {
        setItem(TOKEN, data.token)
        setItem(ROLE, data.role)
        setItem(ID, data.id)
    }

    const getToken = () => {
        return getItem(TOKEN)
    }

    const getRole = () => {
        return getItem(ROLE)
    }
    const getId = () => {
        return getItem(ID)
    }

    const logout = () => {
        removeItem(TOKEN)
        removeItem(ROLE)
        removeItem(ID)
        setRoute(routes.login)
    }

    return { setUser, getToken, getRole, getId, logout }
}