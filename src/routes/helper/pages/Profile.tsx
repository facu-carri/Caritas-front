/* eslint-disable react-hooks/exhaustive-deps */
import { deleteData, getData, putData } from "src/utils/request/httpRequests";
import { endPoints, roles, routes } from "src/utils/constants";
import { useEffect, useState } from 'react';
import { formatDate } from 'src/utils/api';
import { ProfileProps } from 'src/types/PropsTypes';
import { HelperData, UserInfoFields } from 'src/types/Types';
import UserProfile from 'src/components/UserProfile';
import { User } from "src/utils/User";
import RoutesHandler from "src/utils/routesHandler";
import { useCustomModal } from "src/context/CustomModalContext";
import EditExchangerModal from "src/components/modals/EditExchanger";
import { getAdminFields } from "../components/HelperFields";

export default function EmployeeProfile({ id }: ProfileProps) {
    const [helperData, setHelperData] = useState<HelperData>();
    const [info, setInfo] = useState(null)
    const { getRole } = User()
    const { setRoute } = RoutesHandler()
    const { showModal, closeModal } = useCustomModal()

    useEffect(() => {
        getData(`${id ? `${endPoints.otherProfileHelper}${id}` : endPoints.profileHelper}`).then(helperData => setHelperData(helperData));
    }, []);

    useEffect(() => helperData && setInfo(getProfileInfo()), [helperData])

    const getProfileInfo = ():UserInfoFields[] => {
        return [
            { title: "Nombre Completo", value: helperData.name, color: "text-red-500" },
            { title: "Email", value: helperData.email, color: "text-red-500" },
            { title: "DNI", value: helperData.dni, color: "text-red-500" },
            { title: "Teléfono", value: helperData.phone, color: "text-red-500" },
            { title: "Sede asignada", value: helperData.employeeLocation.name, color: "text-red-500" },
            { title: "Fecha de nacimiento", value: formatDate(helperData.birthdate), color: "text-red-500" },
        ]
    }

    const handleDelete = () => deleteData(`${endPoints.employees}/${id}`, null).then(() => setRoute(routes.admin.gestionarAyudantes))

    const handleEditHelper = () => showModal(<EditExchangerModal campos={getAdminFields(helperData)} onSave={handleSave}/>)

    const handleSave = (updatedHelper) => { // EDIT: usar putData de httpRequests
        let errorCode: number
        
        putData(`${endPoints.employees}/${helperData.id}`, null, {
          ...updatedHelper,
          email: helperData.email
        })
        .then(res => setHelperData(res))
        .catch(err => errorCode = err)
    
        if (errorCode) throw new Error(errorCode.toString())
        else closeModal()
    };

    const canDoActions = getRole() == roles.ADMIN

    return (
        <UserProfile
            userData={helperData}
            profileInfo={info}
            showPhoto={true}
            handleEdit={handleEditHelper}
            handleDelete={handleDelete}
            canDeletePhoto={false}
            canDelete={canDoActions}
            canEdit={canDoActions}
        />
    )
}

/*

const handleEditHelper = () => showModal(<EditHelperModal closeModal={() => setCurrentHelper(null)} helper={currentHelper} onSave={handleSave}/>)

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

*/