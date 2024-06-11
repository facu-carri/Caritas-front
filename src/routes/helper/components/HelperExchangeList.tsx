/*import { useQuery } from 'react-query';
import { endPoints, serverAddress } from 'src/utils/constants';
import { getHeaders } from 'src/utils/request/httpRequests';

const fetchExchanges = async () => {
  const response = await fetch(`${serverAddress}/${endPoints.exchange}`,{
    method:'GET',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Hubo un error con la peticion al backend');
  }
  return response.json();
};

const ExchangeList = () => {
  const { data, error, isLoading } = useQuery('exchanges', fetchExchanges);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los intercambios.</div>;
  }
  if(ExchangeList.length==0)
    {
        return <div className='text-center mt-20'>No Hay intercambios registrados para el dia de la fecha</div>
    }
  return (
    <div className="container mx-auto p-4">
      {data.map((exchange) => (
        <div key={exchange.id} className="border p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Intercambio {exchange.id}</h2>
            <span className={`text-sm ${exchange.state === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
              {exchange.state}
            </span>
          </div>
          <div className="mt-2">
            <p><strong>Fecha:</strong> {exchange.date}</p>
            <p><strong>Ubicación:</strong> {exchange.location}</p>
            <p><strong>Invitado Asistió:</strong> {exchange.guestAsistio ? 'Sí' : 'No'}</p>
            <p><strong>Anfitrión Asistió:</strong> {exchange.hostAsistio ? 'Sí' : 'No'}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Items:</h3>
            <p><strong>Item del Invitado:</strong> {exchange.guestItem.nombre}</p>
            <p><strong>Item del Anfitrión:</strong> {exchange.hostItem.nombre}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeList;*/


import { useState, useEffect, useMemo } from "react";
import ExchangerHeader from "src/components/ExchangerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import { Exchange } from "src/types/Types";
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { ExchangeCard } from "src/routes/exchanger/components/ExchangeCard";

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
          return !value || exchange.state.toLowerCase().includes(value) || exchange.authenticationCode.toLowerCase().includes(value) || exchange.location.name.toLowerCase().includes(value)
      });
  }, [searchQuery, exchangeHistory])

  const exchangeDetails = (exchange: Exchange) => [
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
          <ExchangerHeader title="Intercambios" text=""/>
          <div className="flex flex-col justify-center items-center text-[100%] gap-6 md:gap-8 mt-8 min-h-[300px]">
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
              {
                  loading ? (<LoadingSpinner/>) :
                  (!filteredExchanges || filteredExchanges.length==0) ? (<p>No Hay intercambios registrados para el dia de la fecha</p>) : 
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