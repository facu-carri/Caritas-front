import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";
import ErrorPage from "../ErrorPage";

export function AdminRouter() {
  return useRoutes([
    {
      path: "/",
      element: <AdminMain />
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}