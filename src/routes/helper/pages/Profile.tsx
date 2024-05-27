/* eslint-disable react-hooks/exhaustive-deps */
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from 'react';
import { formatDate } from 'src/utils/api';
import { ProfileProps } from 'src/types/PropsTypes';
import { HelperData, UserInfoFields } from 'src/types/Types';
import UserProfile from 'src/components/Profile';

export default function EmployeeProfile({ id }: ProfileProps) {
    const [helperData, setHelperData] = useState<HelperData>();
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getData(`${id ? `${endPoints.otherProfileHelper}${id}` : endPoints.profileHelper}`).then(helperData => setHelperData(helperData));
    }, []);

    useEffect(() => helperData && setInfo(getProfileInfo()), [helperData])

    const getProfileInfo = ():UserInfoFields[] => {
        return [
            { title: "Name", value: helperData.name, color: "text-red-500" },
            { title: "Email", value: helperData.email, color: "text-red-500" },
            { title: "DNI", value: helperData.dni, color: "text-red-500" },
            { title: "Phone", value: helperData.phone, color: "text-red-500" },
            { title: "Location", value: helperData.employeeLocation.id, color: "text-red-500" },
            { title: "Birthdate", value: formatDate(helperData.birthdate), color: "text-red-500" },
        ]
    }

    return (
        <UserProfile userData={helperData} profileInfo={info} showPhoto={true}/>
    )
}