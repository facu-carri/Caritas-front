import { useRoutes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { routes } from "src/libs/constants";
import ExchangerLayout from "./Layout";
import Inventory from "src/components/exchanger/Inventory";
import Profile from "src/components/exchanger/Profile";
import ProductList from "src/components/exchanger/ProductList";
import FormularioRegistroIntercambiador from "./FormularioRegistroIntercambiador";

export function ExchangerRouter() {
  return useRoutes([
    {
      path: routes.main,
      element: <ExchangerLayout />,
      children: [
        { path: routes.main, element: <ProductList/> },
        { path: routes.exchanger.inventory, element: <Inventory /> },
        { path: routes.exchanger.profile, element: <Profile/> },
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    },
    {
      path: '/registro',
      element: <FormularioRegistroIntercambiador/>
    }
  ]);
}