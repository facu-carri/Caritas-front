/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import { deleteData, getHeaders, putData } from 'src/utils/request/httpRequests';
import { useCustomModal } from "src/context/CustomModalContext";
import { endPoints, serverAddress } from "src/utils/constants";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ExchangerCardData } from "src/types/Types";

import EditExchangerAsAdminModal from 'src/routes/admin/components/EditExchangerAsAdminModal';
import ExchangersManagerHeader from "../components/ExchangersManagerHeader";
import ExchangerCard from "src/routes/admin/components/ExchangerCard";
import LoadingSpinner from "src/components/LoadingSpinner";
import ErrorAlert from "src/components/ErrorAlert";

export default function ExchangersManager() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const { showModal, closeModal } = useCustomModal()
    const [error, setError] = useState<ErrorCode>(null)
    const [currentExchanger, setCurrentExchanger] = useState(null);

    const queryClient = useQueryClient()

    const { data: exchangers, isLoading } = useQuery({
        queryKey: ['exchangers'],
        queryFn: () => fetch(`${serverAddress}/${endPoints.exchanger}`, {
            method: 'GET',
            headers: getHeaders()
        }).then(r => r.json()),
        onError: () => {
            handleError(500)
        }
    })

    const filteredExchangers = useMemo(() => {
        if(isLoading) {
            return [];
        }
        const value = searchQuery.toLowerCase()
        const elements = exchangers && exchangers.filter((user: ExchangerCardData) => {
            return !value || user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || user.dni.toLowerCase().includes(value) || user.phone.toLowerCase().includes(value)
        });

        if(exchangers.length > 0 && elements.length === 0) {
            handleError(400)
        } else if(!isLoading && exchangers.length === 0) {
            handleError(404)
        } else {
            hideError()
        }
        return elements;

    }, [isLoading, exchangers, searchQuery])

    function handleError(errCode: number) {
        const err = new ErrorCode(errCode, ErrorTypes.EXCHANGER_ERROR)
        setError(err)
    }

    function hideError() {
        setError(null)
    }

    useEffect(() => {
        if(currentExchanger !== null) {
            showModal(<EditExchangerAsAdminModal exchanger={currentExchanger} onSave={handleSave} />, () => setCurrentExchanger(null))
        }
    }, [currentExchanger])

    function handleEdit(exchanger) {
        setCurrentExchanger(exchanger);
    }
    
    function handleDelete(id) {
        deleteData(`${endPoints.exchanger}/${id}`, null)
            .then(() => queryClient.invalidateQueries(['exchangers']))
    }

    function handleSave(updatedexchanger) { 
        if(!currentExchanger?.id) return;
        if (updatedexchanger.password === "") updatedexchanger.password = null

        putData(`${endPoints.exchanger}/${currentExchanger.id}`, null, {
            ...updatedexchanger,
            email: currentExchanger.email,
            birthdate: "2000-02-02"
        })
            .then(res => console.log(res))
            .then(() => closeModal())
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
            <header className="py-2 px-6 md:px-12 ">
                <div className="flex flex-col items-center gap-4 mt-36">
                    <ExchangersManagerHeader/>
                    <form className="w-full max-w-md space-y-2 flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
                            placeholder="Buscar..."
                            type="text"
                            value={searchQuery}
                            onChange={e=>setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            </header>
            <section>
                {
                    error && (<ErrorAlert attrs="mt-5 w-fit" show={error != null}>{error.getMessage()}</ErrorAlert>)
                }
                <div className="justify-center items-center text-[100%] grid grid-cols-3 gap-6 md:gap-8 mt-8 min-h-[300px]">
                {
                    isLoading ?
                    <LoadingSpinner />
                    :
                    filteredExchangers.map(exchanger => (
                        <ExchangerCard cardData={exchanger} onEdit={handleEdit} onDelete={handleDelete} key={exchanger.id} />
                    ))
                }
                </div>
            </section>
        </div>
    );
}