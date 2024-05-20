import { useRoutes } from "react-router-dom";
import  {ExchangerMain}  from "./main";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import ExchangerLayout from "./Layout";
import Inventory from "src/components/exchanger/Inventory";
import Profile from "src/components/exchanger/Profile";

export function NormalRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ExchangerMain/> },
        { path: routes.exchanger.inventory, element: <Inventory /> },
        { path: routes.exchanger.profile, element: <Profile/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}