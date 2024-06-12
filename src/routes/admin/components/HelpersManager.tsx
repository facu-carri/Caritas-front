import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import RegisterHelper from './RegisterHelper';
import { getData, getHeaders } from 'src/utils/request/httpRequests';
import { endPoints, routes, serverAddress } from "src/utils/constants";
import RoutesHandler from 'src/utils/routesHandler';
import HelpersList from 'src/routes/helper/components/HelpersList';
import { useQuery } from 'react-query';
import ErrorAlert from 'src/components/ErrorAlert';
import { useCustomModal } from 'src/context/CustomModalContext';
import LoadingSpinner from 'src/components/LoadingSpinner';

//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
export default function HelpersManager() {
  const [helpers, setHelpers] = useState([]);
  const { showModal } = useCustomModal()
  const { setRoute } = RoutesHandler()
  const [isLoadingHelpers, setIsLoadingHelpers] = useState(true)

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['location'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.location}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  useEffect(() => {
    getData(endPoints.employees)
      .then(data => setHelpers(data))
      .then(() => setIsLoadingHelpers(false))
  }, [])

  const handleRegisterHelper = () => showModal(<RegisterHelper/>)

  const handleSelect = (id) => {
    if(!id) return
    setRoute(`${routes.helper.profile}/${id}`)
  }

  const locationEnabled = () => (locations && locations.length > 0) ?? false

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        {
          !isLoadingLocations && !locationEnabled() && (<ErrorAlert attrs="mt-5 w-fit" show={true}>No hay sedes cargadas para registrar un ayudante</ErrorAlert>)
        }
        <Button onClick={handleRegisterHelper} disabled={!locationEnabled() || isLoadingLocations}>Registrar ayudante</Button>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Ayudantes</h1>
          {
            isLoadingHelpers ? <LoadingSpinner className='relative left-1/2 transform -translate-x-1/2' /> : < HelpersList helpers={helpers} onSelect={handleSelect} />
          }
        </div>
      </div>
    </div>
  )
}