import { InformativeText } from "src/components/InformativeText";
import { ExchangerCardProps } from "src/types/PropsTypes";
import { Icons } from "src/utils/Icons";
import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";
import {BsPersonVcard, BsTelephone} from 'react-icons/bs'
import { MouseEvent } from "src/types/Types";

export default function ExchangerCard({ cardData, onEdit, onDelete }: ExchangerCardProps) {

    const { setRoute } = RoutesHandler()

    const handleEdit = (ev: MouseEvent) => { ev.stopPropagation(); onEdit(cardData) }
    const handleDelete = (ev: MouseEvent) => { ev.stopPropagation(); onDelete(cardData.id) }
    
    return (
        <div
            className={`${!cardData.visible && 'hidden'} bg-white rounded-lg shadow-lg max-w-sm p-2 cursor-pointer transform transition-transform duration-200 hover:scale-105`}
            onClick={() => setRoute(`${routes.exchanger.profile}/${cardData.id}`)}
        >
            <div className="px-2 py-1">
                <h3 className="text-lg font-semibold">{cardData.name}</h3>
                <InformativeText icon={Icons.email()}>{cardData.email}</InformativeText>
                <InformativeText icon={<BsTelephone/>}>{cardData.phone}</InformativeText>
                <InformativeText icon={<BsPersonVcard/>}>{cardData.dni}</InformativeText>
            </div>
            <div className="flex space-x-2 p-2">
                <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Editar
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                    Eliminar
                </button>
            </div>
        </div>
    )
}