/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from "src/Icons"
import Navbar, { Tab } from "src/components/admin/Navbar"
import { colors, routes } from "src/libs/constants"
import RoutesHandler from "src/libs/routesHandler"
import { Outlet } from "react-router-dom"
import { ButtonType } from "src/components/Button"
import CircularDropdown from "src/components/DropDown"
import { useLogout } from "src/context/LogoutContext"

export default function ExchangerLayout() {

  const { setRoute } = RoutesHandler()
  const { setShowLogoutModal } = useLogout()

  const startTabs: Tab[] = [
    {
      icon: Icons.home(colors.white),
      onClick: () => setRoute(routes.main),
      active: false
    },
    {
      text:"Quienes Somos",
      onClick: () => setRoute(routes.exchanger.caritasInformation),
      active: false
    }
  ]

  const dropdownItems: ButtonType[] = [
    {
      text: 'Inventario',
      onClick: () => setRoute(routes.exchanger.inventory)
    },
    {
      text: 'Perfil',
      onClick: () => setRoute(routes.exchanger.profile)
    },
    {
      text: 'Cerrar sesion',
      onClick: () => setShowLogoutModal(true)
    }
  ]

  const endTabs: Tab[] = [
    {
      icon: Icons.username(colors.white),
      customElement: <CircularDropdown icon={Icons.username()} items={dropdownItems}/>
    }
  ]

  return (
    <>
      <Navbar startTabs={startTabs} endTabs={endTabs} />
      <Outlet/>
    </>
  )
}