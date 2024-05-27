import ExchangerHeader from "src/components/ExchangerHeader";
import { endPoints } from "src/utils/constants";
import ItemList from "../components/ItemList";

export const ExchangerMain = () => {

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Descubre nuevos productos para intercambiar" text="Explora nuestra selección de productos disponibles para intercambios"/>
            <ItemList ruta={endPoints.exchangeablesItems} />
        </div>
    )
}