import { useRoutes } from "react-router-dom";
import { routes } from "src/utils/constants";
import ExchangerLayout from "./components/Navbar/Layout";
import Inventory from "src/routes/exchanger/components/inventory/Inventory";
import RoutesHandler from "src/utils/routesHandler";
import ErrorPage from "../error/ErrorPage";
import { Information } from "./pages/Information";
import Profile from "./pages/Profile";
import { ExchangerMain } from "./pages/main";

export function ExchangerRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ExchangerMain/> },
        { path: routes.exchanger.inventory, element: <Inventory /> },
        { path: routes.exchanger.profile, element: <Profile/> },
        { path: routes.exchanger.information, element: <Information/> },
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}