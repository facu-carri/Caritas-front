import { useState, useEffect } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { ExchangeCard } from "../components/ExchangeCard";

export default function ExchangesHistory() {
    
    const [exchangeHistory, setExchangeHistory] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Function to fetch the user's exchange history from the backend
    const fetchExchangeHistory = () => {
        // Implement your logic to fetch the exchange history here
        // For example, you can make an API call to retrieve the data
        // and return an array of exchange objects
        // Simulating a delay of 2 seconds before setting the exchange history
        setTimeout(() => {
            // Simulating a successful response
            setExchangeHistory([
                { date: "2022-01-01", fromCurrency: "USD", toCurrency: "EUR", amount: 100 },
                { date: "2022-01-02", fromCurrency: "EUR", toCurrency: "GBP", amount: 200 },
            ]);
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        fetchExchangeHistory();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Historial de intercambios" text=""/>
            <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
                {
                    loading ? (<LoadingSpinner/>) :
                    error ? (<p>No hay intercambios</p>) : 
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