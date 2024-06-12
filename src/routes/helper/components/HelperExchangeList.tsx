import { useState, useEffect, useMemo } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { getData, putData } from "src/utils/request/httpRequests";
import { endPoints, routes } from "src/utils/constants";
import { ExchangeCard } from "src/routes/exchanger/components/ExchangeCard";
import RoutesHandler from "src/utils/routesHandler";
import Button from "src/components/Button";
import ConfirmationModal from "src/components/modals/Confirmation";
import { useCustomModal } from "src/context/CustomModalContext";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import ErrorAlert from "src/components/ErrorAlert";
import { parseExchangeStateName } from "src/utils/parser";

export default function ExchangesHistory() {

  const { setRoute } = RoutesHandler()
  const [searchQuery, setSearchQuery] = useState('');
  const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);
  const [error, setError] = useState<ErrorCode>(null)
  const { showModal } = useCustomModal()
  const [loading, setLoading] = useState(true);
  const [showEndDay, setShowEndDay] = useState(false);

  useEffect(() => {
      setLoading(true)
      getData(endPoints.exchange)
        .then(data => setExchangeHistory(data))
        .then(() => setLoading(false))
      getData(endPoints.todayIsFinished)
        .then(() => setShowEndDay(true))
        .catch(() => setShowEndDay(false))
  }, [])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.END_DAY_ERROR)
    setError(err)
    setTimeout(hideError, 5000)
  }

  const hideError = () => setError(null)

  const filteredExchanges = useMemo(() => {
    const value = searchQuery.toLowerCase()
    return exchangeHistory.filter((exchange) => {
        return !value || exchange.state.toLowerCase().includes(value) || exchange.authenticationCode.toLowerCase().includes(value)
    });
  }, [searchQuery, exchangeHistory])

  const exchangeDetails = (exchange: Exchange) => [
    { label: "Fecha del intercambio", value: exchange.date },
    { label: "Sede", value: exchange.location?.name },
    { label: "Solicitante", value: `${exchange.hostItem.owner?.name} | ${exchange.hostItem.owner?.email}` },
    { label: "Item del solicitante", value: exchange.hostItem.name },
    { label: "Solicitado", value: `${exchange.guestItem.owner?.name} | ${exchange.guestItem.owner?.email}` },
    { label: "Item solicitado", value: exchange.guestItem.name },
    { label: "Estado", value: parseExchangeStateName(exchange.state) },
    { label: "Codigo", value: exchange.authenticationCode },
  ].filter(detail => detail.value);

  const endDay = () => {
    putData(endPoints.endDay)
      .then(() => setRoute(routes.main))
      .catch((err) => handleError(err))
  }

  const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)

  return (
      <div className="bg-gray-100 min-h-screen">
        <ExchangerHeader title="Intercambios" text="">
          {showEndDay && <Button attrs="mt-3" onClick={() => confirmation(endDay)}>Finalizar dia</Button>}
        </ExchangerHeader>
        <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
          <p className="mx-auto max-w-[700px] md:text-xl text-gray-400 text-center">
            Filtra por estado o codigo
          </p>
          <form className="w-full max-w-md space-y-2 flex space-x-2" onSubmit={(e) => e.preventDefault()}>
            <input
              className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Buscar..."
              type="text"
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
            />
          </form>
          {
            <ErrorAlert show={error != null}>
              <span>{error && error.getMessage()}</span>
            </ErrorAlert>
          }
          {
            loading ? (<LoadingSpinner/>) :
            (!filteredExchanges || filteredExchanges.length==0) ? (<p>No Hay intercambios registrados para el dia de la fecha</p>) : 
            (
              <div className="flex flex-col gap-2 w-1/2">
                {filteredExchanges.map((exchange) => (
                    <div key={exchange.id} onClick={()=>setRoute(`${routes.helper.exchange}/${exchange.id}`)}>
                      <ExchangeCard exchangeDetails={exchangeDetails(exchange)}/>
                    </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
  )
}