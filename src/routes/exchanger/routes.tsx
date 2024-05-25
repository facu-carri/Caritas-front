import { useRoutes } from "react-router-dom";
import { routes } from "src/utils/constants";
import ExchangerLayout from "./components/Layout";
import Profile from "src/components/exchanger/Profile";
import ProductList from "src/components/exchanger/ProductList";
import Inventory from "src/components/exchanger/inventory/Inventory";
import { endPoints } from "src/utils/constants";
import CaritasInformation from "src/components/filiales/CaritasInformation";
import RoutesHandler from "src/utils/routesHandler";
import ErrorPage from "../error/ErrorPage";

export function ExchangerRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ProductList ruta={endPoints.exchangeablesProducts} text='Descubre nuevos productos para intercambiar' subText='Explora nuestra selección de productos disponibles para intercambios.'/> },
        { path: routes.exchanger.inventory, element: <Inventory /> },
        { path: routes.exchanger.profile, element: <Profile/> },
        { path: routes.exchanger.caritasInformation, element: <CaritasInformation/> },
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}