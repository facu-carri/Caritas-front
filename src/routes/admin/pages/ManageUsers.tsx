/* eslint-disable react-hooks/exhaustive-deps */
import ErrorAlert from "src/components/ErrorAlert";
import PersonCard from "src/routes/admin/components/PersonCard";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { endPoints } from "src/utils/constants";
import { deleteData, getData, putData } from 'src/utils/request/httpRequests';
import EditExchangerAsAdminModal from 'src/routes/admin/components/EditExchangerAsAdminModal';
import { useEffect, useRef, useState } from 'react';
import { ExchangerData } from "src/types/Types";

type ExchangerCard = {
    visible: boolean
} & ExchangerData

export default function ManagerUsers() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<ExchangerCard[]>([])
    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState<ErrorCode>(null)
    const [currentexchanger, setCurrentexchanger] = useState(null);

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

    const handleEdit = (exchanger) => {
        setCurrentexchanger(exchanger);
        setIsEditing(true);
        
        
        const elem = (document.getElementById('editExchangerAsAdminModal') as HTMLDialogElement)
        elem.showModal()
    };
    
    const handleDelete = (id) => {
        deleteData(`${endPoints.exchanger}/${id}`, null)
            .then(() => setUsers(prev => prev.filter(user => user.id !== id)))
    };
    
    /*const handleSave = (updatedexchanger) => { // EDIT: usar putData de httpRequests
        putData(`${endPoints.employees}/${updatedexchanger.id}`, null, updatedexchanger)
          .then(res => console.log(res))
          
        /*setexchangers(exchangers.map(exchanger =>
          exchanger.id === updatedexchanger.id ? updatedexchanger : exchanger
        ));*//*
        setIsEditing(false);
    };*/
    const modalEditRef = useRef(null)
    
  const handleClickEditModal = (ev) => {
    const target = ev ? ev.target : null
    if (target == null || target.id && target.id == modalEditRef.current.id) {
      modalEditRef.current.close()
      setCurrentexchanger(null)
    }
  }
  const handleSave = (updatedexchanger) => { 
    if(updatedexchanger.password === "") {
      updatedexchanger.password = null;
    }
    updatedexchanger.birthdate="2000-02-02"
    console.log(updatedexchanger)
    putData(`${endPoints.exchanger}/${currentexchanger.id}`, null, {
      ...updatedexchanger,
      email: currentexchanger.email,
      birthdate:"2000-02-02"
    })
      .then(res => console.log(res))
      
    /*setexchangers(exchangers.map(exchanger =>
      exchanger.id === updatedexchanger.id ? updatedexchanger : exchanger
    ));*/
  };
    return (<>
    
        <dialog className="modal bg-gray-500/50" id='editExchangerAsAdminModal' onClick={handleClickEditModal} ref={modalEditRef}>
        <EditExchangerAsAdminModal closeModal={handleClickEditModal} helper={currentexchanger} onSave={handleSave} />
        </dialog>
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
        </>
    );
}