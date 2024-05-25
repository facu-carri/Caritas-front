import AuthProvider from "../context/AuthContext";
import CustomModalProvider from "../context/CustomModalContext";
import Login from "./login/Login";
import RoleBasedRouting from "../utils/RoleRouting";
import { routes } from "../utils/constants";
import Registro from "./register/Registro";

export function MainRouter() {
  return [
    {
      path: "/*",
      element: (
          <AuthProvider>
            <CustomModalProvider>
              <RoleBasedRouting/>
            </CustomModalProvider>
          </AuthProvider>
      ),
    },
    {
      path: routes.login,
      element: <Login />,
    },
    {
      path: routes.register,
      element: <Registro/>,
    },
  ]
}
