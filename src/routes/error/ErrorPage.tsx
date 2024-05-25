/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { routes } from "src/utils/constants"
import RoutesHandler from "src/utils/routesHandler"

export default function ErrorPage() {

    const { setRoute } = RoutesHandler()

    useEffect(() => {
        setTimeout(() => setRoute(routes.main), 1000)
    }, [])

    return(
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh] text-[100%]">
            <h1>Error 404</h1>
            <h1>Page not found</h1>
        </div>
    )
}