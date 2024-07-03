/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { ExchangeCard } from "../components/ExchangeCard";
import { getData, putData } from "src/utils/request/httpRequests";
import { useCustomModal } from "src/context/CustomModalContext";
import Button from "src/components/Button";
import ConfirmationModal from "src/components/modals/Confirmation";
import { parseExchangeStateName } from "src/utils/parser";
import RoutesHandler from "src/utils/routesHandler";
import { endPoints, routes } from "src/utils/constants";

export default function ExchangesHistory({route, title}) {
    const [searchQuery, setSearchQuery] = useState('');
    const { showModal, closeModal } = useCustomModal()
    const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const { setRoute } = RoutesHandler()

    useEffect(() => {
        setLoading(true)
        getData(route)
          .then(data => setExchangeHistory(data))
          .finally(() => setLoading(false))
    }, [route]);

    const value = searchQuery.toLowerCase()
    const filteredExchanges = useMemo(() => {
        return exchangeHistory.filter((exchange) => {
            return !value || parseExchangeStateName(exchange.state).toLowerCase().includes(value) || exchange.authenticationCode.toLowerCase().includes(value) || exchange.location?.name?.toLowerCase().includes(value)
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchQuery, exchangeHistory])

    const confirmation = (fn) => showModal(<ConfirmationModal onAccept={fn}/>)

    const canDeleteExchange = (exchange: Exchange) => {
        const date: Date = new Date(exchange.date)
        const currDate: Date = new Date()
        const validDate = date.getDate() - currDate.getDate() + 1 >= 1
        const validState = exchange.state === 'Accepted'
        return exchange.state === 'NotConfirmed' || (validDate && validState)
    }

    const onClickExchange = (exchange: Exchange) => {
        /*showModal(<ExchangeCard exchange={exchange}>
            {canDeleteExchange(exchange) && <Button onClick={() => confirmation(() => onCancelExchange(exchange))}>Cancelar intercambio</Button>}
        </ExchangeCard>)*/
        setRoute(`${routes.exchanger.exchange}/${exchange.id}`)
    }

    const onCancelExchange = (exchange: Exchange) => {
        console.log('Cancel exchange', exchange)
        putData(`${endPoints.exchange}/cancel/${exchange.id}`)
        .then(() => {
            setExchangeHistory(exchangeHistory.map(e => e.id === exchange.id ? {...e, state: 'Canceled'} : e))
        })
        .finally(() => closeModal())
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title={title}/>
            <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
            {
                loading ? (<LoadingSpinner/>) :
                (!filteredExchanges) ? (<p>No hay intercambios</p>) : (
                <>
                    <p className="mx-auto max-w-[700px] md:text-xl text-gray-400 text-center">
                        Filtra por sede, estado o codigo
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
                    <div className="flex flex-col gap-2">
                    {
                        filteredExchanges.length == 0 ? (<p>No hay intercambios</p>) :
                        filteredExchanges.map((exchange, index) => (
                            <ExchangeCard key={index} exchange={exchange} onClick={() => onClickExchange(exchange)}/>
                        ))
                    }
                    </div>
                </>)
            }
            </div>
        </div>
    )
}