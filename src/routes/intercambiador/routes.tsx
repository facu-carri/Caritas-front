import { useRoutes } from "react-router-dom";
import { NormalMain } from "./main";
import { TestPage } from "../TestPage";

export function NormalRouter() {
  return useRoutes([
    {
      path: "/",
      element: <NormalMain />
    },
    {
      path: '/test',
      element: <TestPage/>
    }
  ]);
}