import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import HelperLayout from "./Layout";

export function HelperRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <HelperMain/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}