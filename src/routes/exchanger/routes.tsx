import { useRoutes } from "react-router-dom";
import { routes } from "src/utils/constants";
import ExchangerLayout from "./components/Navbar/Layout";
import Inventory from "src/routes/exchanger/components/inventory/Inventory";
import RoutesHandler from "src/utils/routesHandler";
import ErrorPage from "../error/ErrorPage";
import { Information } from "./pages/Information";
import Profile from "./pages/Profile";
import { ExchangerMain } from "./pages/main";
import ExchangesHistory from "./pages/ExchangesHistory";
import Item from "./pages/Item";
import { endPoints } from "src/utils/constants";
import Exchange from "./pages/Exchange";

export function ExchangerRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ExchangerMain /> },
        { path: routes.exchanger.requestsSent, element: <ExchangesHistory route={endPoints.requestsSent} title={"Solicitudes enviadas pendientes"}/> },
        { path: `${routes.exchanger.requestsReceived}/*`, element: <ExchangesHistory route={endPoints.requestsReceived+"/"+getId()} title={"Solicitudes recibidas pendientes"}/> },
        { path: `${routes.exchanger.exchangesHistory}/*`, element: <ExchangesHistory route={endPoints.exchangesHistory+"/"+getId()} title={"Historial de intercambios"}/> },
        { path: `${routes.exchanger.exchange}/*`, element: <Exchange id={getId()}/> },
        //{ path: routes.exchanger.history, element: <ExchangesHistory route={endPoints.exchange} title={"Historial de intercambios"}/> },
        { path: routes.exchanger.inventory, element: <Inventory /> },
        { path: routes.exchanger.profile, element: <Profile/> },
        { path: routes.exchanger.information, element: <Information/> },
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>},
        { path: `${routes.item}/*`, element: <Item id={getId()}/>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}