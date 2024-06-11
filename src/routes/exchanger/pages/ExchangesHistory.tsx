import { useState, useEffect } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { ExchangeCard } from "../components/ExchangeCard";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";

export default function ExchangesHistory() {
    
    const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true)
        getData(endPoints.exchange)
          .then(data => setExchangeHistory(data))
          .then(() => setLoading(false))
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Historial de intercambios" text=""/>
            <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
                {
                    loading ? (<LoadingSpinner/>) :
                    (!exchangeHistory || exchangeHistory.length==0) ? (<p>No hay intercambios</p>) : 
                    (
                        <div className="flex flex-col gap-2 w-1/2">
                            {exchangeHistory.map((exchange, index) => (
                                <ExchangeCard key={index} exchange={exchange}/>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}