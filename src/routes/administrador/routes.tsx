import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AdminLayout from "./Layout";
import HelpersManager from "src/components/admin/HelpersManager";
import Maps from "../maps/Map";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import ManagerUsers from "./ManageUsers";
import Profile from "src/components/exchanger/Profile";
import RoutesHandler from "src/libs/routesHandler";

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
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}