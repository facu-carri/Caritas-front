import { routes } from "src/libs/constants";
import RoutesHandler from "src/libs/routesHandler";
import { ExchangerData } from "src/libs/types/ExchangerData";

type Type = {
  data: ExchangerData
}

export default function PersonCard({ data }: Type) {

  const { setRoute } = RoutesHandler()

  return (
    <div
      className="bg-white rounded-lg shadow-lg max-w-sm cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={() => setRoute(`${routes.exchanger.profile}/${data.id}`)}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{data.email}</p>
        <p className="text-gray-500 dark:text-gray-400">{data.phone}</p>
        <p className="text-gray-500 dark:text-gray-400">{data.dni}</p>
      </div>
    </div>
  );
}