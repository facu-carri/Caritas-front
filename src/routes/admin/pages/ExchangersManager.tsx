/* eslint-disable react-hooks/exhaustive-deps */
import ErrorAlert from "src/components/ErrorAlert";
import ExchangerCard from "src/routes/admin/components/ExchangerCard";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { endPoints } from "src/utils/constants";
import { deleteData, getData, putData } from 'src/utils/request/httpRequests';
import EditExchangerAsAdminModal from 'src/routes/admin/components/EditExchangerAsAdminModal';
import { useEffect, useState } from 'react';
import { useCustomModal } from "src/context/CustomModalContext";
import { ExchangerCardData } from "src/types/Types";
import ExchangersManagerHeader from "../components/ExchangersManagerHeader";

export default function ExchangersManager() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [exchangers, setExchangers] = useState<ExchangerCardData[]>([])
    const { showModal } = useCustomModal()
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
            .then((exchangers: ExchangerCardData[]) => setExchangers(exchangers.map(exchanger => { exchanger.visible = true;  return exchanger})))
            .catch((errorCode:number) => handleError(errorCode))
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filterExchangers = () => {
        const value = searchQuery.toLowerCase()
        const filtered = exchangers.map((user: ExchangerCardData) => {
            user.visible = value == ' ' || user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || user.dni.toLowerCase().includes(value) || user.phone.toLowerCase().includes(value) 
            return user
        });
        setExchangers(filtered);
        
        const visibles = filtered.filter(user => user.visible)
        if (visibles.length <= 0) handleError(400)
    }

    const handleEdit = (exchanger) => {
        setCurrentexchanger(exchanger);
        showModal(<EditExchangerAsAdminModal exchanger={exchanger} onSave={handleSave} />, () => setCurrentexchanger(null))
    }
    
    const handleDelete = (id) => {
        deleteData(`${endPoints.exchanger}/${id}`, null).then(() => setExchangers(prev => prev.filter(user => user.id !== id)))
    }

    const getExchangersCards = () => {
        return exchangers.map((exchanger) => (
            <ExchangerCard cardData={exchanger} onEdit={handleEdit} onDelete={handleDelete} key={exchanger.id} />
        ))
    }

    const handleSave = (updatedexchanger) => { 
        if (updatedexchanger.password === "") updatedexchanger.password = null
        
        putData(`${endPoints.exchanger}/${currentexchanger.id}`, null, {
            ...updatedexchanger,
            email: currentexchanger.email,
            birthdate:"2000-02-02"
        })
        .then(res => console.log(res))
        
        setExchangers(exchangers.map(exchanger =>
            exchanger.id === updatedexchanger.id ? updatedexchanger : exchanger
        ))
    }

    return (
        <section className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <ExchangersManagerHeader/>
                <form className="w-full max-w-md space-y-2 flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Buscar..."
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500" onClick={filterExchangers}>
                        Filtrar
                    </button>
                </form>
            </div>
            {
                error && (<ErrorAlert attrs="mt-5" show={error != null}>{error.getMessage()}</ErrorAlert>)
            }
            <div className="justify-center items-center text-[100%] grid grid-cols-3 gap-6 md:gap-8 mt-8 min-h-[300px]">
            {
                getExchangersCards()
            }
            </div>
        </section>
    );
}