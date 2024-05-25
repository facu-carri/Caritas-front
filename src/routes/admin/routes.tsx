import { useRoutes } from "react-router-dom";
import { AdminMain } from "./pages/main";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import AdminLayout from "./components/Layout";
import HelpersManager from "src/components/admin/HelpersManager";
import Maps from "../maps/Map";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import ManagerUsers from "./pages/ManageUsers";
import Profile from "src/components/exchanger/Profile";
import EmployeeProfile from "src/components/helper/Profile";
import RoutesHandler from "src/utils/routesHandler";

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
        { path: routes.admin.gestionarUsuarios, element: <ManagerUsers/>},
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