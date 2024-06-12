/* eslint-disable react-hooks/exhaustive-deps */
import Button from "src/components/Button"
import { routes } from "src/utils/constants"
import RoutesHandler from "src/utils/routesHandler"

export default function ErrorPage() {

    const { setRoute } = RoutesHandler()

    return(
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">404</h1>
            <p className="text-2xl text-gray-500 dark:text-gray-400">Página no encontrada</p>
            <Button attrs="mt-2" onClick={() => setRoute(routes.main)}>Ir a la página principal</Button>
        </div>
    )
}