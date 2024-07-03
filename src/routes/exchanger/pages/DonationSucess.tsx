/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import Button from "src/components/Button"
import { endPoints, routes, serverAddress } from "src/utils/constants"
import { getHeaders } from "src/utils/request/httpRequests"
import RoutesHandler from "src/utils/routesHandler"

export default function DonationSucess() {

    const { setRoute } = RoutesHandler()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let amount = urlParams.get('amount')
        const isAnon = urlParams.get('isAnon')
        amount = amount.replace("?isAnon", "&isAnon");
        if (amount) {
            handleSaveDonation(amount)
        }
    }, [])
    const handleSaveDonation = (amount) => {
        fetch(`${serverAddress}/${endPoints.trackDonation}?amount=${amount}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: getHeaders(),
        })
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">Donacion Exitosa!</h1>
            <Button attrs="mt-2" onClick={() => setRoute(routes.main)}>Ir a la página principal</Button>
        </div>
    )
}