import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";
import ErrorPage from "../ErrorPage";
import RegistroAyudante from "src/components/helper/Form";

export function HelperRouter() {
  return useRoutes([
    {
      path: "/",
      element: <HelperMain />
    },
    {
      path: 'registro',
      element: <RegistroAyudante/>
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}