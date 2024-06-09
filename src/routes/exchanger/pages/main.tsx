import ExchangerHeader from "src/components/ExchangerHeader";
import { endPoints, serverAddress } from "src/utils/constants";
import ItemList from "../components/ItemList";
import { useQuery } from "react-query";
import { getHeaders } from "src/utils/request/httpRequests";

export const ExchangerMain = () => {

    const ruta = endPoints.exchangeablesItems

    const { data: inventory = [] } = useQuery({
        queryKey: [ruta],
        queryFn: () => fetch(`${serverAddress}/${ruta}`, {
          method: 'GET',
          headers: getHeaders()
        }).then(r => r.json())
    })


    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Descubre nuevos productos para intercambiar" text="Explora nuestra selección de productos disponibles para intercambios"/>
            <ItemList inventory={inventory} ruta={endPoints.exchangeablesItems} />
        </div>
    )
}