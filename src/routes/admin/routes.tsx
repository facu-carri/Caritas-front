import { useRoutes } from "react-router-dom";
import { AdminMain } from "./pages/main";
import ErrorPage from "../error/ErrorPage";
import { routes } from "src/utils/constants";
import AdminLayout from "./components/Navbar/Layout";
import HelpersManager from "src/routes/admin/components/HelpersManager";
import Maps from "../maps/Map";
import AuthEmployeeProvider from "src/context/AuthEmployee";
import RoutesHandler from "src/utils/routesHandler";
import ExchangersManager from "./pages/ExchangersManager";
import Profile from "../exchanger/pages/Profile";
import EmployeeProfile from "../helper/pages/Profile";
import DonationsManager from "./pages/DonationsManager";
import Estadisticas from "./pages/Estadisticas";
import ExchangesHistory from "./pages/ExchangesHistory";
import Exchange from "./components/Exchange";
import CategorysManager from "./pages/CategorysManager";

export function AdminRouter() {

  const { getId } = RoutesHandler()

  return useRoutes([
    {
      path: routes.main,
      element: <AuthEmployeeProvider><AdminLayout /></AuthEmployeeProvider>,
      children: [
        { path: routes.main, element: <AdminMain/> },
        { path: routes.admin.gestionarFiliales, element: <Maps /> },
        { path: routes.admin.gestionarCategorias, element: <CategorysManager /> },
        { path: routes.admin.gestionarIntercambiadores, element: <ExchangersManager/>},
        { path: routes.admin.gestionarAyudantes, element: <HelpersManager /> },
        { path: `${routes.exchanger.profile}/*`, element: <Profile id={getId()}/>},
        { path: `${routes.helper.profile}/*`, element: <EmployeeProfile id={getId()}/>},
        { path: `${routes.admin.exchange}/*`, element: <Exchange id={getId()}/>},
        { path: routes.admin.listarDonaciones, element: <DonationsManager/>},
        { path: routes.admin.listarIntercambios, element: <ExchangesHistory/>},
        { path: routes.admin.estadisticas, element: <Estadisticas/>},
      ]
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ]);
}