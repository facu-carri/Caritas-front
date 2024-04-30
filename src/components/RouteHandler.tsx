/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRoute } from "src/context/RouteContext"

//chequear esto cuando se implemente algun cambio de ruta (submit del login)

const RouteHandler = () => {

    const navigator = useNavigate()
    const { route } = useRoute()

    useEffect(() => {
        navigator(route)
    }, [route])

    return (<></>)
}

export default RouteHandler