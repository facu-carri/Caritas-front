import ExchangeInfo from "src/routes/helper/components/ExchangeInfo";
import { Exchange } from "src/types/Types";
import { parseExchangeStateName } from "src/utils/parser";

export const ExchangeCard = ({ exchange }: { exchange: Exchange }) => {
    return (
        <div className="bg-gray-700 w-fit p-4 md:p-6 space-y-5 gap-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
            <h1 className="text-2xl font-bold text-white">#{exchange.authenticationCode}</h1>
            <div className="grid grid-cols-2">
                <section>
                    <p className="text-sm font-medium text-gray-400">Fecha</p>
                    <p className="text-gray-50 font-medium">{exchange.date}</p>
                </section>
                <section>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sede</p>
                    <p className="text-gray-50 font-medium">{exchange.location?.name}</p>
                </section>
            </div>
            <div className="flex gap-10">
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-4">Solicitante</p>
                    <ExchangeInfo checked={false} itemData={{ ...exchange.guestItem, photo: '' }}/>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-4">Solicitado</p>
                    <ExchangeInfo checked={false} itemData={{ ...exchange.hostItem, photo: '' }}/>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-400">Estado</p>
                <p className="text-white font-medium">{parseExchangeStateName(exchange.state)}</p>
            </div>
        </div>
    );
}