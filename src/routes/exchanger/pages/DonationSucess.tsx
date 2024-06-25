/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import Button from "src/components/Button"
import { endPoints, routes } from "src/utils/constants"
import { postData } from "src/utils/request/httpRequests"
import RoutesHandler from "src/utils/routesHandler"

export default function DonationSucess() {

    const { setRoute } = RoutesHandler()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get('amount')
        const isAnon = urlParams.get('isAnon')
        if (amount) {
            postData(endPoints.trackDonation, null, { amount: amount, isAnon: isAnon})
        }
    }, [])

    return(
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">Donacion Exitosa!</h1>
            <Button attrs="mt-2" onClick={() => setRoute(routes.main)}>Ir a la página principal</Button>
        </div>
    )
}