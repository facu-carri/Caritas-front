import { useEffect, useState } from 'react';
import EditHelperModal from './EditHelperModal';
import Button from '../../../components/Button';
import RegisterHelper from './RegisterHelper';
import { deleteData, getData, getHeaders, putData } from 'src/utils/request/httpRequests';
import { endPoints, routes, serverAddress } from "src/utils/constants";
import RoutesHandler from 'src/utils/routesHandler';
import HelpersList from 'src/routes/helper/components/HelpersList';
import { useQuery } from 'react-query';
import ErrorAlert from 'src/components/ErrorAlert';
import { useCustomModal } from 'src/context/CustomModalContext';

//tiene toda la logica de eliminar y editar ayudantes listados y su estado.
export default function HelpersManager() {
  const [helpers, setHelpers] = useState([]);
  const [currentHelper, setCurrentHelper] = useState(null);
  const { showModal } = useCustomModal()
  const { setRoute } = RoutesHandler()

  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['location'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.location}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  useEffect(() => {
    getData(endPoints.employees)
      .then(data => setHelpers(data));
  }, []);

  const handleEdit = (helper) => {
    handleEditHelper()
    setCurrentHelper(helper);
  };

  const handleDelete = (id) => {
    deleteData(`${endPoints.employees}/${id}`, null)
      .then(() => setHelpers(helpers.filter(helper => helper.id !== id)))
  };

  const handleSave = (updatedHelper) => { // EDIT: usar putData de httpRequests
    if(updatedHelper.password === "") {
      updatedHelper.password = null;
    }
    console.log(updatedHelper)
    putData(`${endPoints.employees}/${currentHelper.id}`, null, {
      ...updatedHelper,
      email: currentHelper.email
    })
      .then(res => console.log(res))
  };

  const handleRegisterHelper = () => {
    showModal(<RegisterHelper/>)
  }

  const handleEditHelper = () => {
      showModal(<EditHelperModal closeModal={() => setCurrentHelper(null)} helper={currentHelper} onSave={handleSave}/>)
  }

  const handleSelect = (id) => {
    if(!id) return
    setRoute(`${routes.helper.profile}/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
        {
          !isLoadingLocations && !locations?.length && (<ErrorAlert attrs="mt-5 w-fit" show={true}>No hay sedes cargadas para registrar un ayudante</ErrorAlert>)
        }
        <Button onClick={handleRegisterHelper} disabled={!locations?.length || isLoadingLocations}>Registrar ayudante</Button>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Ayudantes</h1>
          <HelpersList helpers={helpers} onEdit={handleEdit} onDelete={handleDelete} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  )
}