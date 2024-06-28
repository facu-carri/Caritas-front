import { endPoints } from "src/utils/constants";
import { postData } from 'src/utils/request/httpRequests';
import { useCustomModal } from 'src/context/CustomModalContext';
import { BsPlus } from 'react-icons/bs';
import ExchangerHeader from 'src/components/ExchangerHeader';
import { useQueryClient } from 'react-query';
import AddCategoryModal from "../components/AddCategoryModal";
import CategorysList from "../components/CategorysList";
import { useState } from "react";
import { ErrorCode } from "src/utils/Error/ErrorCode";
import { ErrorTypes } from "src/utils/Error/ErrorTypes";

export default function CategorysManager() {
    const { showModal, closeModal } = useCustomModal()

    const ruta = endPoints.inventory

    const queryClient = useQueryClient() // Y esto que es?
    const [error, setError] = useState<ErrorCode>(null)

    const handleError = (errCode: number) => {
        const err = new ErrorCode(errCode, ErrorTypes.ITEMCATEGORYS_ERROR)
        setError(err)
        setTimeout(hiddeError, 5000)
    }
    const hiddeError = () => {
        setError(null)
    }
    const handleModal = () => showModal(<AddCategoryModal onClose={closeModal} onAddItemCategory={addItemCategory}/>)
    const addItemCategory = (category) => 
        postData(endPoints.itemCategories, null, category)
            .then(() => {
                queryClient.invalidateQueries([ruta]); // Y esto que es?
                queryClient.invalidateQueries(['inventory']); // Y esto que es?
            })
            .catch((errCode: number) => handleError(errCode))
            
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Categorias" text="Aviso: Si elimina una categoria se eliminaran todas las publicaciones que tengan esta categoria asignada. Le recomendamos nunca eliminar una categoria. Una categoria eliminada no se podra volver a cargar."/>
            <CategorysList >
                <button onClick={handleModal} className="p-2 flex flex-row items-center space-x-2 px-2 gap-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500">
                    <BsPlus className='h-4 w-4'/>
                    Agregar Categoria
                </button>
                {error && <p>La categoria ingresada ya existe o existio y fue eliminada. </p>}
            </CategorysList>
        </div>
    )
}
