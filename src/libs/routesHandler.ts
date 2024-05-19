import { useLocation, useNavigate } from "react-router-dom"

export default function RoutesHandler() {
    
    const location = useLocation()
    const navigator = useNavigate()

    const getRoute = () => {
        return location.pathname
    }

    const setRoute = (route: string) => {
        if(getRoute() == route) return
        navigator(route)
    }

    return { getRoute, setRoute, location: location.pathname }
}