/* eslint-disable react-hooks/exhaustive-deps */

import { User } from "./User"
import { roles } from "./constants"
import { AdminRouter } from "../routes/administrador/routes"
import { HelperRouter } from "../routes/ayudante/routes"
import { NormalRouter } from "../routes/intercambiador/routes"

export default function RoleBasedRouting() {
  const { getRol } = User()
  const rol = getRol()

  switch (rol) {
    case roles.ADMIN:
      return <AdminRouter/>
    case roles.HELPER:
      return <HelperRouter/>
    case roles.NORMAL:
      return <NormalRouter/>
  }
}