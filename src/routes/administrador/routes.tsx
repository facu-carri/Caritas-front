import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AdminLayout from "./Layout";
import HelpersManager from "src/components/helper/HelpersManager";
import Maps from "../maps/Map";
import AuthenticationCodeInput from "../login/AuthenticationCodeInput";
import AuthEmployeeProvider from "src/context/AuthEmployee";

export function AdminRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><AdminLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <AdminMain/> },
        { path: routes.admin.gestionarFiliales, element: <Maps/> },
        { path: routes.admin.gestionarAyudantes, element:<HelpersManager/>}
      ]
    },
    {
      path: routes.auth,
      element: <AuthenticationCodeInput onSubmit={() => {}}/>
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}