import { useRoutes } from "react-router-dom";
import { HelperMain } from "./main";

export function HelperRouter() {
  return useRoutes([
    {
      path: "/",
      element: <HelperMain />
    },
  ]);
}