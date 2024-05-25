/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { routes } from "src/utils/constants"
import RoutesHandler from "src/utils/routesHandler"

export const AdminMain = () => {

  const { setRoute } = RoutesHandler()

  useEffect(() => {
    setRoute(routes.admin.gestionarAyudantes)
  }, [])

  return <></>
}