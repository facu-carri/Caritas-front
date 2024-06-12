import { useRoutes } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import HelperLayout from "./components/Navbar/Layout";
import EmployeeProfile from "./pages/Profile";
import Exchange from "./pages/Exchange";
import ExchangesHistory from "./components/HelperExchangeList";

export function HelperRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <ExchangesHistory /> },
        { path: routes.helper.profile, element: <EmployeeProfile/> },
        { path: `${routes.helper.exchange}/*`, element: <Exchange id={getId()} /> }
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}