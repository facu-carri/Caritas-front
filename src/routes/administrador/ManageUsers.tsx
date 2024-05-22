/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import ErrorAlert from "src/components/ErrorAlert";
import PersonCard from "src/components/admin/PersonCard";
import { ErrorCode } from "src/libs/Error/ErrorCode";
import { ErrorTypes } from "src/libs/Error/ErrorTypes";
import { endPoints } from "src/libs/constants";
import { ExchangerData } from "src/libs/types/ExchangerData";
import { deleteData, getData, putData } from 'src/libs/request/httpRequests';

type ExchangerCard = {
    visible: boolean
} & ExchangerData

export default function ManagerUsers() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<ExchangerCard[]>([])
    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState<ErrorCode>(null)
    const [currentHelper, setCurrentHelper] = useState(null);

    const handleError = (errCode: number) => {
        const err = new ErrorCode(errCode, ErrorTypes.EXCHANGER_ERROR)
        setError(err)
        setTimeout(hiddeError, 5000)
    }

    const hiddeError = () => {
        setError(null)
    }

    useEffect(() => {
        getData(endPoints.exchanger)
            .then((exchangers: ExchangerCard[]) => setUsers(exchangers.map(exchanger => { exchanger.visible = true;  return exchanger})))
            .catch((errorCode:number) => handleError(errorCode))
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filterUsers = () => {
        const value = searchQuery.toLowerCase()
        const filtered = users.map((user: ExchangerCard) => {
            user.visible = value == ' ' || user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || user.dni.toLowerCase().includes(value) || user.phone.toLowerCase().includes(value) 
            return user
        });
        setUsers(filtered);
        
        const visibles = filtered.filter(user => user.visible)
        if (visibles.length <= 0) {
            handleError(400)
        }
    }



    const handleEdit = (helper) => {
        setCurrentHelper(helper);
        setIsEditing(true);
      };
    
      const handleDelete = (id) => {
        deleteData(`${endPoints.exchanger}/${id}`, null)
          .then(() => setUsers(users.filter(user => user.id !== id)))
      };
    
      const handleSave = (updatedHelper) => { // EDIT: usar putData de httpRequests
        putData(`${endPoints.employees}/${updatedHelper.id}`, null, updatedHelper)
          .then(res => console.log(res))
          
        /*setHelpers(helpers.map(helper =>
          helper.id === updatedHelper.id ? updatedHelper : helper
        ));*/
        setIsEditing(false);
      };
    




    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <section className="w-full py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="space-y-2 sticky top-0 bg-gray-100 py-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Listado de Usuarios</h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Filtra por nombre, email, teléfono o DNI.
                            </p>
                        </div>
                        <div className="w-full max-w-md space-y-2">
                            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Buscar..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
                                    onClick={filterUsers}
                                >
                                    Filtrar
                                </button>
                            </form>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-5">
                            <ErrorAlert show={error != null}>
                                <span>{error.getMessage()}</span>
                            </ErrorAlert>
                        </div>
                    )}
                    <div className="justify-center items-center text-[100%] grid grid-cols-3 gap-6 md:gap-8 mt-8 min-h-[300px]">
                        {users.map((exchanger) => (
                            <div className={`${!exchanger.visible && 'hidden'}`} key={exchanger.id}>
                                <PersonCard person={exchanger} onEdit={handleEdit} onDelete={handleDelete} key={exchanger.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}