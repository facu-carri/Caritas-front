import { useRoutes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import ExchangerLayout from "./Layout";
import Profile from "src/components/exchanger/Profile";
import ProductList from "src/components/exchanger/ProductList";
//import Inventory from "src/components/exchanger/inventory/Inventory";
import { endPoints } from "src/libs/constants";

export function ExchangerRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ProductList ruta={endPoints.exchangeablesProducts} text='Descubre nuevos productos para intercambiar' subText='Explora nuestra selección de productos disponibles para intercambios.'/> },
        { path: routes.exchanger.inventory, element: <ProductList ruta={endPoints.inventory} text='Mi inventario' subText="Consejo: Para intercambiar con un producto tienes que tener un producto de la misma cartegoria cargado"/>/*<Inventory /> */},
        { path: routes.exchanger.profile, element: <Profile/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}