import { useNavigate } from "react-router-dom"
import { routes } from "./constants"
import { getItem, removeItem, setItem } from "./localStorage"

export const User = () => {

    const TOKEN: string = 'token'
    const ROL: string = 'rol'
    const navigator = useNavigate()

    const setUser = (data) => {
        setItem(TOKEN, data)
        navigator(routes.main)
    }
    
    const getToken = () => {
        return getItem(TOKEN)
    }

    const getRol = () => {
        return getItem(ROL)
    }

    const logout = () => {
        removeItem(TOKEN)
        navigator(routes.main)
    }

    return { setUser, getToken, getRol, logout }
}