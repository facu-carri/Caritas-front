export const ExchangeCard = ({ exchangeDetails }) => {
    return (
        <div className="bg-gray-700 w-full rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
            <div className="p-4 md:p-6 space-y-4 w-full">
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