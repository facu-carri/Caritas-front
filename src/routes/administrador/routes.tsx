import { useRoutes } from "react-router-dom";
import { AdminMain } from "./main";

export function AdminRouter() {
  return useRoutes([
    {
      path: "/",
      element: <AdminMain />
    },
  ]);
}