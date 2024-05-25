import { useRoutes } from "react-router-dom";
import { HelperMain } from "./pages/main";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import HelperLayout from "./components/Navbar/Layout";
import { EmployeeProfile } from "./components/Profile";

export function HelperRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <HelperMain /> },
        { path: routes.helper.profile, element: <EmployeeProfile/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}