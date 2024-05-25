import AuthProvider from "../context/AuthContext";
import CustomModalProvider from "../context/CustomModalContext";
import LogoutProvider from "../context/LogoutContext";
import FormularioRegistroIntercambiador from "./register/FormularioRegistroIntercambiador";
import Login from "./login/Login";
import RoleBasedRouting from "../utils/RoleRouting";
import { routes } from "../utils/constants";

export function MainRouter() {
  return [
    {
      path: "/*",
      element: (
        <LogoutProvider>
          <AuthProvider>
            <CustomModalProvider>
              <RoleBasedRouting />
            </CustomModalProvider>
          </AuthProvider>
        </LogoutProvider>
      ),
    },
    {
      path: routes.login,
      element: <Login />,
    },
    {
      path: routes.register,
      element: <FormularioRegistroIntercambiador />,
    },
  ]
}
