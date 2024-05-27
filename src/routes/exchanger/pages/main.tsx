import ExchangerHeader from "src/components/ExchangerHeader";
import ItemListInventory from "../components/ItemList";
import { endPoints } from "src/utils/constants";

export const ExchangerMain = () => {

    return (
        <div className="bg-gray-100 min-h-screen">
            <ExchangerHeader title="Descubre nuevos productos para intercambiar" text="Explora nuestra selección de productos disponibles para intercambios"/>
            <ItemListInventory ruta={endPoints.exchangeablesItems} />
        </div>
    )
}