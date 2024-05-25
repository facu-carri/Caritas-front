/* eslint-disable react-hooks/exhaustive-deps */
import { colors, routes } from "src/utils/constants"
import RoutesHandler from "src/utils/routesHandler"
import { Outlet } from "react-router-dom"
import { ButtonType } from "src/components/Button"
import CircularDropdown from "src/components/DropDown"
import Navbar, { Tab } from "src/routes/admin/components/Navbar/Navbar"
import { Icons } from "src/utils/Icons"
import { useCustomModal } from "src/context/CustomModalContext"
import LogoutModal from "src/components/modals/Logout"

export default function ExchangerLayout() {

  const { setRoute } = RoutesHandler()
  const { setModal } = useCustomModal()

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
      onClick: () => setModal(<LogoutModal/>)
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