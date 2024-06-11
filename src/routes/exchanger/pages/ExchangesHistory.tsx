import { useState, useEffect, useMemo } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { ExchangeCard } from "../components/ExchangeCard";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";

export default function ExchangesHistory() {
    const [searchQuery, setSearchQuery] = useState('');
    
    const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true)
        getData(endPoints.exchange)
          .then(data => setExchangeHistory(data))
          .then(() => setLoading(false))
    }, []);

    const value = searchQuery.toLowerCase()
    const filteredExchanges = useMemo(() => {
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
        { label: "Estado", value: exchange.state },
        { label: "Codigo", value: exchange.authenticationCode },
    ].filter(detail => detail.value);

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Historial de intercambios" text=""/>
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
                    loading ? (<LoadingSpinner/>) :
                    (!filteredExchanges || filteredExchanges.length==0) ? (<p>No hay intercambios</p>) : 
                    (
                        <div className="flex flex-col gap-2 w-1/2">
                            {filteredExchanges.map((exchange, index) => (
                                <ExchangeCard key={index} exchangeDetails={exchangeDetails(exchange)}/>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}