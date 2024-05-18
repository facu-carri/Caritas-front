import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import { TestPage } from "../TestPage";
import AdminLayout from "./Layout";

export function AdminRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AdminLayout />,
      children: [
        { path: routes.main, element: <AdminMain/> },
        { path: routes.admin.gestionarFiliales, element: <TestPage/> }
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}