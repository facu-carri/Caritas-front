/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import { useQuery } from "react-query";
import { getHeaders } from 'src/utils/request/httpRequests';
import { endPoints, serverAddress } from "src/utils/constants";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";
import { ExchangerCardData } from "src/types/Types";
import ManagerHeader from "../components/ManagerHeader";
import LoadingSpinner from "src/components/LoadingSpinner";
import ErrorAlert from "src/components/ErrorAlert";
import DonationCard from '../components/DonationCard';

export default function DonationsManager() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<ErrorCode>(null)

    const { data: donations, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: () => fetch(`${serverAddress}/${endPoints.getAllDonations}`, {
            method: 'GET',
            headers: getHeaders()
        }).then(r => r.json()),
        onError: () => {
            handleError(500)
        }
    })

    const filteredDonations = useMemo(() => {
        if(isLoading) {
            return [];
        }
        const value = searchQuery.toLowerCase()
        const elements = donations && donations.filter(donation => donation.donor) && donations.filter((donation) => {
            return !value || donation.donor.name.toLowerCase().includes(value) || donation.donor.email.toLowerCase().includes(value) || donation.donor.dni.toLowerCase().includes(value) || donation.donor.phone.toLowerCase().includes(value)
        });

        if(donations && elements && donations.length > 0 && elements.length === 0) {
            handleError(400)
        } else if(!isLoading && donations && donations.length === 0) {
            handleError(404)
        } else {
            hideError()
        }
        return elements;

    }, [isLoading, donations, searchQuery])

    function handleError(errCode: number) {
        const err = new ErrorCode(errCode, ErrorTypes.DONATION_ERROR)
        setError(err)
    }

    function hideError() {
        setError(null)
    }

    return (
        <main className='min-h-screen bg-gray-100'>
        <div className=" flex flex-col items-center justify-center p-4 relative">
            <header className="py-2 px-6 md:px-12 ">
                <div className="flex flex-col items-center gap-4 mt-36">
                    <ManagerHeader entidad={"donaciones"} listaFiltrados = {false && "nombre, email, teléfono o DNI del donador"}/>
                    {false &&
                    <form className="w-full max-w-md space-y-2 flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="max-w-lg flex-1 p-2 border border-gray-300 rounded-md"
                            placeholder="Buscar..."
                            type="text"
                            value={searchQuery}
                            onChange={e=>setSearchQuery(e.target.value)}
                        />
                    </form>}
                </div>
            </header>
            <section>
                {
                    error && (<ErrorAlert attrs="mt-5 w-fit" show={error != null}>{"No hay donaciones"}</ErrorAlert>)
                }
                <div className="justify-center items-center text-[100%]">
                {
                    isLoading ? <LoadingSpinner className='mt-7'/>:
                    <div className='grid grid-cols-3 gap-6 md:gap-8 mt-8 min-h-[300px]'>
                        {filteredDonations && filteredDonations.map(donation => (
                            <DonationCard cardData={donation} key={donation.id} />
                        ))}
                    </div>
                }
                </div>
            </section>
        </div>
        </main>
    );
}