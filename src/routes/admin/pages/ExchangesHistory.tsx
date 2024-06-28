/* eslint-disable react-hooks/exhaustive-deps */
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
  const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>(null);
  const [error, setError] = useState<ErrorCode>(null)
  const { showModal } = useCustomModal()
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [dayEnded, setDayEnded] = useState(false);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    setLoading(true)
    getData(endPoints.exchange)
      .then(data => setExchangeHistory(data))   
      .catch(() => setExchangeHistory([]))
    getData(endPoints.todayIsFinished)
      .then(value => setDayEnded(value))
    getData(endPoints.location)
      .then(value => setLocations(value))
  }, [])

  useEffect(() => {
    if (dayEnded) {
      handleError(409)
      setLoading(false)
    }
    setLoading(exchangeHistory == null)
  }, [dayEnded, exchangeHistory])

  const handleError = (errCode: number) => {
    const err = new ErrorCode(errCode, ErrorTypes.END_DAY_ERROR)
    setError(err)
    //setTimeout(hideError, 5000)
  }

  const hideError = () => setError(null)

  const filteredExchanges = useMemo(() => {
    const value = searchQuery.toLowerCase()
    if(!exchangeHistory) return []
    return exchangeHistory.filter(exchange => {
                      if(!location) return true
                      return exchange.location && exchange.location.name === location
                  })
                          .filter((exchange) => {
                      return !value || parseExchangeStateName(exchange.state).toLowerCase().includes(value) || exchange.authenticationCode.toLowerCase().includes(value) || exchange.date?.toLowerCase().includes(value)
                  })
  }, [searchQuery, exchangeHistory, location])

  const endDay = () => {
    putData(endPoints.endDay)
      .then(() => setRoute(routes.main))
      .catch((err) => handleError(err))
  }

  const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)


  return (
    <div className="bg-gray-100 min-h-screen">
      <ExchangerHeader title="Intercambios">
      </ExchangerHeader>
      <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
      {
          <select className="p-2 border border-gray-700 rounded-lg" value={location} onChange={e => setLocation(e.target.value)}>
            <option value="">
            {
                !locations || locations.length == 0 ? 'No hay sedes cargadas' :
                'Todas las sedes'
            }
            </option>
            {
              locations?.map(location =><option key={location.id} value={location.name}>{location.name}</option>)
            }
          </select>
        }
        <p className="mx-auto max-w-[700px] md:text-xl text-gray-400 text-center">
          Filtra por fecha, estado o código
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
          <ErrorAlert attrs="w-fit" show={error != null}>
            <span>{error && error.getMessage()}</span>
          </ErrorAlert>
        }
        {
          loading ? (<LoadingSpinner/>) : 
          (!filteredExchanges || filteredExchanges.length==0) ? (<p>No Hay intercambios registrados</p>) : 
          (!dayEnded &&
            <div className="flex flex-col gap-2 items-center mb-2">
              {filteredExchanges.map((exchange) => (
                <ExchangeCard key={exchange.id} exchange={exchange} onClick={() => setRoute(`${routes.admin.exchange}/${exchange.id}`)}/>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}