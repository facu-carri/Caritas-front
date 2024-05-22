import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AdminLayout from "./Layout";
import HelpersManager from "src/components/helper/HelpersManager";
import Maps from "../maps/Map";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import ManagerUsers from "./ManageUsers";

export function AdminRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><AdminLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <AdminMain/> },
        { path: routes.admin.gestionarFiliales, element: <Maps /> },
        { path: routes.admin.gestionarUsuarios, element: <ManagerUsers/>},
        { path: routes.admin.gestionarAyudantes, element:<HelpersManager/>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}