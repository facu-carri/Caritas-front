import { useLocation, useNavigate } from "react-router-dom"

export default function RoutesHandler() {
    
    const location = useLocation()
    const navigator = useNavigate()

    const getRoute = () => {
        return location.pathname
    }

    const setRoute = (route: string) => {
        navigator(route)
    }

    const getId = () => {
        const split = location.pathname.split('/')
        return split[split.length - 1]
    }

    return { getRoute, setRoute, location, getId }
}