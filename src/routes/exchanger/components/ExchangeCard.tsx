import { Exchange } from "src/types/Types"

export const ExchangeCard = ({ exchange }: { exchange: Exchange }) => {
    return (
        <div className="bg-gray-700 w-full rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
            <div className="p-4 md:p-6 space-y-4">
                <span className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    {exchange.date}
                </span>
                <div className="flex flex-row gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Type:
                        </span>
                        <span className="font-medium text-white">
                            {'type' || exchange.date}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Amount:
                        </span>
                        <span className="font-medium text-white">
                            {'33' || exchange.hostItem.quantity}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                            Transaction:
                        </span>
                        <span className="font-medium text-white">
                            {'test' || exchange.state}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}