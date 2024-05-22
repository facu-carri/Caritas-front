import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import HelperLayout from "./Layout";
import Profile from "src/components/exchanger/Profile";

export function HelperRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <HelperMain /> },
        { path: routes.main, element: <Profile/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}