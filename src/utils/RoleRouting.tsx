/* eslint-disable react-hooks/exhaustive-deps */

import { User } from "./User"
import { roles } from "./constants"
import { AdminRouter } from "../routes/admin/routes"
import { HelperRouter } from "../routes/helper/routes"
import ErrorPage from "src/ErrorPage"
import { ExchangerRouter } from "src/routes/exchanger/routes"

export default function RoleBasedRouting() {
  const { getRole, logout } = User()
  const role = getRole()

  switch (role) {
    case roles.ADMIN:
      return <AdminRouter/>
    case roles.HELPER:
      return <HelperRouter/>
    case roles.EXCHANGER:
      return <ExchangerRouter/>
    default:
      logout()
      return <ErrorPage/>
  }
}