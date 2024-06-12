import { InformativeText } from "src/components/InformativeText";
import { Icons } from "src/utils/Icons";
import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";
import {BsCalendar, BsPersonVcard, BsStar, BsTelephone} from 'react-icons/bs'
import Rating from "src/components/Rating";
import { ExchangerData } from "src/types/Types";
import AvatarPhoto from "src/components/AvatarPhoto";

type ExchangerCardProps = {
    cardData: ExchangerData,
    removeClick?: boolean,
    children?: JSX.Element | JSX.Element[]
}

export default function ExchangerCard({ cardData, removeClick, children }: ExchangerCardProps) {

    const { setRoute } = RoutesHandler()

    return (
        <div
            className='relative bg-white rounded-lg shadow-lg max-w-sm p-2 cursor-pointer transform transition-transform duration-200 hover:scale-10'
            onClick={() => !removeClick && setRoute(`${routes.exchanger.profile}/${cardData.id}`)}
        >
            <div className="px-2 py-1">
                <div className="flex flex-row gap-2 py-2">
                    <AvatarPhoto photo={cardData.photo} name={cardData.name}/>
                    <h3 className="text-black flex flex-col justify-center text-lg font-semibold">{cardData.name}</h3>
                </div>
                {cardData.email && <InformativeText icon={Icons.email()}>{cardData.email}</InformativeText>}
                {cardData.phone && <InformativeText icon={<BsTelephone/>}>{cardData.phone}</InformativeText>}
                {cardData.dni && <InformativeText icon={<BsPersonVcard />}>{cardData.dni}</InformativeText>}
                {cardData.birthdate && <InformativeText icon={<BsCalendar />}>{cardData.birthdate}</InformativeText>}
                {cardData.stars && <InformativeText icon={<BsStar />}>{<Rating qty={cardData.stars} />}</InformativeText>}
                {cardData.absentees && <InformativeText icon={"Inasistencias:"}>{cardData.absentees}</InformativeText>}
                {children}
            </div>
        </div>
    )
}