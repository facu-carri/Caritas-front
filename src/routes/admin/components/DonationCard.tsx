import { InformativeText } from "src/components/InformativeText";
import { Icons } from "src/utils/Icons";
import {BsCalendar, BsPersonVcard, BsStar, BsTelephone} from 'react-icons/bs'
import Rating from "src/components/Rating";
import { FaBitcoin } from "react-icons/fa";
import AvatarPhoto from "src/components/AvatarPhoto";
import ExchangerCard from "./ExchangerCard";


export default function DonationCard({ cardData }) {

    return (
        <div className='relative bg-white rounded-lg shadow-lg max-w-sm p-2 cursor-pointer transform transition-transform duration-200 hover:scale-10' >
            <div className="px-2 py-1">
                {
                    cardData.donor? 
                        <ExchangerCard cardData={cardData.donor} key={cardData.donor.id} />
                    :   
                        <p>Esta donacion ha sido anonima</p>
                }
            </div>
            {cardData.amount && <InformativeText icon={<FaBitcoin />}>{cardData.amount}</InformativeText>}
            {cardData.date && <InformativeText icon={<BsCalendar />}>{cardData.date}</InformativeText>}
        </div>
    )
}
/* 
                <div className="flex flex-row gap-2 py-2">
                    <AvatarPhoto photo={cardData.photo} name={cardData.name}/>
                    <h3 className="text-black flex flex-col justify-center text-lg font-semibold">{cardData.name}</h3>
                </div>
                {cardData.email && <InformativeText icon={Icons.email()}>{cardData.email}</InformativeText>}
                {cardData.phone && <InformativeText icon={<BsTelephone/>}>{cardData.phone}</InformativeText>}
                {cardData.dni && <InformativeText icon={<BsPersonVcard />}>{cardData.dni}</InformativeText>}
                {cardData.birthdate && <InformativeText icon={<BsCalendar />}>{cardData.birthdate}</InformativeText>}
                {cardData.stars && <InformativeText icon={<BsStar />}>{<Rating qty={cardData.stars} />}</InformativeText>}
                {(cardData.absentees != null) && <InformativeText icon={"Inasistencias:"}>{cardData.absentees}</InformativeText>}
            */