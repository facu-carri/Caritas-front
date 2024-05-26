/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from 'react-avatar';
import { getData } from "src/utils/request/httpRequests";
import { endPoints } from "src/utils/constants";
import { useEffect, useState } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';
import { formatDate } from 'src/utils/api';
import { ProfileProps } from 'src/types/PropsTypes';
import { HelperData } from 'src/types/Types';

function Profile({ id }: ProfileProps) {
  const [helperData, setHelperData] = useState<HelperData>();
  
  function setData(data: HelperData) {
    setHelperData(data)
  }

  useEffect(() => {
    getData(`${id ? `${endPoints.otherProfileHelper}${id}` : endPoints.profileHelper}`)
      .then(helperData => setData(helperData));
  }, []);
  
  if (!helperData) {
    return <LoadingAnimation />
  }

  return (
    <>{ !helperData ? <LoadingAnimation /> :
      <div className="flex flex-col min-h-screen">
        <header className="bg-gradient-to-r from-red-500 to-blue-500 py-8 px-6 md:px-12 mt-16">
          <div className="flex items-center justify-between space-x-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Avatar name={helperData.name} size="48" round={true} />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{helperData.name}</h1>
              <p className="text-sm">@{helperData.email}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-12">
          <section className="max-w-4xl mx-auto grid gap-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Informacion Personal
            </h2>
            <img src={`data:image/jpeg;base64,${helperData.photo}`} alt={helperData.name} className="mb-4 w-full rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Name", value: helperData.name, color: "text-red-500" },
                { title: "Email", value: helperData.email, color: "text-red-500" },
                { title: "DNI", value: helperData.dni, color: "text-red-500" },
                { title: "Phone", value: helperData.phone, color: "text-red-500" },
                { title: "Location", value: helperData.employeeLocation.id, color: "text-red-500" },
                { title: "Birthdate", value: formatDate(helperData.birthdate), color: "text-red-500" },
              ].map((info, idx) => (
                <div key={`info-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    }</>
  )
}

export {Profile as EmployeeProfile}