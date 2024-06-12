import { useRoutes } from "react-router-dom";
import { HelperMain } from "./pages/main";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import RoutesHandler from "src/utils/routesHandler";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import HelperLayout from "./components/Navbar/Layout";
import EmployeeProfile from "./pages/Profile";
import Exchange from "./pages/Exchange";

export function HelperRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <HelperMain /> },
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