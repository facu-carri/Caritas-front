import { Exchange } from "src/types/Types"

export const ExchangeCard = ({ exchange }) => {
    const exchangeDetails = [
        { label: "Fecha del intercambio", value: exchange.date },
        { label: "Sede", value: exchange.location?.name },
        { label: "Solicitante", value: `${exchange.hostItem.owner?.name} | ${exchange.hostItem.owner?.email}` },
        { label: "Item del solicitante", value: exchange.hostItem.name },
        { label: "Solicitado", value: `${exchange.guestItem.owner?.name} | ${exchange.guestItem.owner?.email}` },
        { label: "Item solicitado", value: exchange.guestItem.name },
        { label: "Estado", value: exchange.state },
        { label: "Codigo", value: exchange.authenticationCode },
    ].filter(detail => detail.value);

    return (
        <div className="bg-gray-700 w-full rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
            <div className="p-4 md:p-6 space-y-4 w-full">
                <span className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    {exchange.date}
                </span>
                <div className="flex flex-col gap-2">
                    {exchangeDetails.map((detail, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                                {detail.label}:
                            </span>
                            <span className="font-medium text-white">
                                {detail.value || 'N/A'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};