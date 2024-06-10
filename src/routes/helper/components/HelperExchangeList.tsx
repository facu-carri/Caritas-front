import { useQuery } from 'react-query';
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

export default ExchangeList;
