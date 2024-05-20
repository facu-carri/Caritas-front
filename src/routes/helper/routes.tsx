import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import AuthenticationCodeInput from "../login/AuthenticationCodeInput";
import AuthEmployeeProvider from "src/context/AuthEmployee";

export function HelperRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><HelperMain/></AuthEmployeeProvider>
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