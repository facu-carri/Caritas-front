/* eslint-disable react-hooks/exhaustive-deps */
import ExchangerHeader from "src/components/ExchangerHeader";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { useEffect, useState } from "react";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";

export default function MakeDonation() {

  const [_preferenceId, setPreferenceId] = useState(null)

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: 'es-AR' })
    getData(endPoints.donation).then((id) => {
      setPreferenceId(id)
    }).catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ExchangerHeader title="Hacer una donación" />
      {_preferenceId != null && <Wallet initialization={{ preferenceId: _preferenceId }} />}
    </div>
  )
}