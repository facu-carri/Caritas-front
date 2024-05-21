/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { routes } from "src/libs/constants"
import RoutesHandler from "src/libs/routesHandler"

export const AdminMain = () => {

  const { setRoute } = RoutesHandler()

  useEffect(() => {
    setRoute(routes.admin.gestionarAyudantes)
  }, [])

  return <></>
}