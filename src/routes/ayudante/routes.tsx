import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";
import ErrorPage from "../ErrorPage";

export function HelperRouter() {
  return useRoutes([
    {
      path: "/",
      element: <HelperMain />
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}