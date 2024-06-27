import { getData } from 'src/utils/request/httpRequests';
import { endPoints } from "src/utils/constants";
import { EstadisticasData } from "src/types/Types";
import { useEffect, useState } from 'react';
import PieChartSection from '../components/GraficoTorta';
import GraficoBarras from '../components/GraficoBarras';
import LoadingAnimation from 'src/components/LoadingAnimation';
import { parseExchangeStateName } from 'src/utils/parser';

const Estadisticas = () => {
  const [data, setData] = useState<EstadisticasData>();

  useEffect(() => {
    getData(endPoints.estadisticas)
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error("There was an error fetching the statistics!", error);
        });
    console.log(data)
  }, []);

  if (!data) {
    return <LoadingAnimation />;
  }

  // Preparación de datos para gráficos
  const pieDataLocations = data.locationsData.map(location => ({
    name: location.name,
    value: location.exchangesCount
  }));
  const barDataCategorias = data.itemCategorysData.map(category => ({
    name: category.name,
    value: category.itemsCount
  }));

  const pieDataUsuarios = [
    { name: 'Usuarios no Bloqueados', value: data.userCount - data.bannedUserCount },
    { name: 'Usuarios Bloqueados', value: data.bannedUserCount },
  ];
  const pieDataItems = [
    { name: 'Items actualmente no intercambiables', value: data.itemCount - data.availableItemCount },
    { name: 'Items actualmente intercambiables', value: data.availableItemCount },
  ];
  
  const cantDonations = data.donationCount;
  const totalDonations = data.totalDonations;
  const averageUserRating = data.averageUserRating;

  const stateOrder = [
    'NotConfirmed',
    'RejectedByDislike',
    'RejectedByPreference',
    'RejectedByTrust',
    'Accepted',
    'Canceled',
    'Completed',
    'NotComplitedByDislike',
    'NotComplitedByNonAttendance'
  ];
  
  const sortExchanges = (a, b) => {
    const indexA = stateOrder.indexOf(a.stateName);
    const indexB = stateOrder.indexOf(b.stateName);
    return indexA - indexB;
  };
  
  const barDataIntercambios = data.exchangesData
    .sort(sortExchanges)
    .map(exchange => ({
      name: parseExchangeStateName(exchange.stateName),
      value: exchange.exchangesCount
    }));
  
  return (
    <main className='min-h-screen bg-gray-100'>
        <div className=" flex flex-col items-center justify-center p-4 relative">
            <header className="py-2 px-6 md:px-12 ">
                <div className="flex flex-col items-center gap-4 mt-36">
                    <div className="space-y-2 sticky top-0 py-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-7xl">Estadísticas</h1>
                    </div>
                </div>
            </header>
        </div>
        <div>
            <PieChartSection nombreEntidades={"Usuarios"} data={pieDataUsuarios} />
            <div className="flex flex-col items-center gap-4 mt-36">
                <div className="space-y-2 sticky top-0 py-4">
                        <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-2xl">Estrellas promedio de los usuarios: {averageUserRating}</h2>
                </div>
            </div>
            <GraficoBarras nombreEntidades={"Sedes"} nombreEjeY={"Cantidad de intercambios"} data={pieDataLocations} />
            <PieChartSection nombreEntidades={"Publicaciones"} data={pieDataItems} />
            <GraficoBarras nombreEntidades={"Categorias"} nombreEjeY={"Cantidad de publicaciones"} data={barDataCategorias} />
            <GraficoBarras nombreEntidades={"Intercambios"} nombreEjeY={"Cantidad de intercambios"} data={barDataIntercambios} />
            <div className="flex flex-col items-center gap-4 mt-36">
                <div className="space-y-2 sticky top-0 py-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{"Información sobre Donaciones"}</h1>
                    <div style={{ height: 150}}>
                        <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-2xl">Numero de Donaciones: {cantDonations}</h2>
                        <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-2xl">Total recaudado por Donaciones: ${totalDonations}</h2>
                    </div>
                </div>
            </div>
        </div>
    </main>
);

};

export default Estadisticas;
