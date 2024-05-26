import { useRoutes } from "react-router-dom";
import { AdminMain } from "./pages/main";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import AdminLayout from "./components/Navbar/Layout";
import HelpersManager from "src/routes/admin/components/HelpersManager";
import Maps from "../maps/Map";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import Profile from "src/routes/exchanger/components/Profile";
import RoutesHandler from "src/utils/routesHandler";
import { EmployeeProfile } from "../helper/components/Profile";
import ExchangersManager from "./pages/ExchangersManager";

export function AdminRouter() {

  const { location } = RoutesHandler()

  const getId = () => {
    const split = location.pathname.split('/')
    return split[split.length - 1]
  }

  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><AdminLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <AdminMain/> },
        { path: routes.admin.gestionarFiliales, element: <Maps /> },
        { path: routes.admin.gestionarIntercambiadores, element: <ExchangersManager/>},
        { path: routes.admin.gestionarAyudantes, element: <HelpersManager /> },
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>},
        { path: `${routes.helper.profile}/*`, element: <EmployeeProfile id={getId()}/>},
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}