/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "src/libs/constants"

export default function ErrorPage() {

    const nav = useNavigate()

    useEffect(() => {
        setTimeout(() => nav(routes.login), 5000)
    }, [])

    return(
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh] text-[100%]">
            <h1>Error 404</h1>
            <h1>Page not found</h1>
        </div>
    )
}