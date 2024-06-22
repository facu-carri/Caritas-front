/* eslint-disable react-hooks/exhaustive-deps */
import ExchangerHeader from "src/components/ExchangerHeader";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { useEffect, useState } from "react";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import Input from "src/components/Input";
import { MdOutlineAttachMoney } from "react-icons/md";
import LoadingSpinner from "src/components/LoadingSpinner";
import Button from "src/components/Button";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import ErrorAlert from "src/components/ErrorAlert";

export default function MakeDonation() {

  const [_preferenceId, setPreferenceId] = useState(null)
  const [quantity, setQuantity] = useState<string | number>(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorCode>(null)
  
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: 'es-AR' })
  }, []);

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.DONATION_ERROR)
    setError(err)
    setTimeout(hiddeError, 5000)
  }

  const hiddeError = () => {
    setError(null)
  }

  const getPreference = () => {
    setLoading(true)

    if (!quantity || quantity == 0) {
      handleError(400)
      setLoading(false)
      return
    }

    getData(`${endPoints.donation}/${JSON.stringify(quantity)}`).then((id) => setPreferenceId(id))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const checkDecimals = (value: string) => {
    if (value.indexOf('.') !== -1 && value.split('.')[1].length > 2) {
      return false
    }
    return true
  }

  const validateQty = (e) => {
    const value = e.target.value
    if(!checkDecimals(value)) return
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
    else setQuantity('')
    setPreferenceId(null)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ExchangerHeader title="Hacer una donación" />
      <section className="w-full max-w-md mx-auto h-1/2 py-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Dona y apoya nuestra causa</h2>
          <p className="text-muted-foreground">
            Tu donación nos ayudará a seguir brindando servicios y recursos a nuestra comunidad.<br/>Cualquier cantidad es
            apreciada ❤️
          </p>
          <div className="grid gap-2">
            <label htmlFor="donation-amount">Monto de la donación</label>
            <Input icon={<MdOutlineAttachMoney/>} type="number" placeholder="0" min="0" value={quantity} onChange={validateQty} />
          </div>
          <ErrorAlert show={error != null}>{error?.getMessage()}</ErrorAlert>
          {
            loading ? <div className="flex justify-center items-center text-[100%] mt-8"><LoadingSpinner /></div> :
            _preferenceId ?
              <Wallet
                initialization={{
                  preferenceId: _preferenceId,
                  redirectMode: 'self',
                }}
                customization={{
                  texts: {
                    action: 'pay',
                    actionComplement: 'amount',
                    valueProp: 'payment_methods_logos'
                  },
                  visual: {
                    hideValueProp: true,
                  },
                }}
              /> :
              <Button onClick={getPreference} attrs="w-full">Donar</Button>
          }
        </div>
      </section>
    </div>
  )
}