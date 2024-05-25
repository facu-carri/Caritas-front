/* eslint-disable react-hooks/exhaustive-deps */
import { colors, routes } from "src/utils/constants"
import RoutesHandler from "src/utils/routesHandler"
import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import CircularDropdown from "src/components/DropDown"
import { useCustomModal } from "src/context/CustomModalContext"
import { Icons } from "src/utils/Icons"
import Navbar from "../../../../components/Navbar"
import LogoutModal from "src/components/modals/Logout"
import { DropdownItem, Tab } from "src/types/Types"

export default function AdminLayout() {

  const { setRoute, getRoute } = RoutesHandler()
  const [showMenu, setShowMenu] = useState(false)
  const dropdownRef = useRef(null);
  const { showModal } = useCustomModal()


  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const btnActive = (route: string) => {
    return getRoute() == route
  }

  const startTabs: Tab[] = [
    {
      icon: Icons.home(colors.white),
      onClick: () => setRoute(routes.main),
      active: false
    }
  ]

  const middleTabs: Tab[] = [
    {
      text: 'Ver estadísticas',
      onClick: () => setRoute(routes.admin.estadisticas),
      active: btnActive(routes.admin.estadisticas)
    },
    {
      text: 'Gestionar Ayudantes',
      onClick: () => setRoute(routes.admin.gestionarAyudantes),
      active: btnActive(routes.admin.gestionarAyudantes)
    },
    {
      text: 'Gestionar usuarios',
      onClick: () => setRoute(routes.admin.gestionarUsuarios),
      active: btnActive(routes.admin.gestionarUsuarios)
    },
    {
      text: 'Gestionar filiales',
      onClick: () => setRoute(routes.admin.gestionarFiliales),
      active: btnActive(routes.admin.gestionarFiliales)
    },
    {
      text: 'Lista de donaciones',
      onClick: () => setRoute(routes.admin.listarDonaciones),
      active: btnActive(routes.admin.listarDonaciones)
    }
  ]

  const dropdownItems: DropdownItem[] = [
    {
      text: 'Cerrar sesion',
      onClick: () => showModal(<LogoutModal/>)
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
      <Navbar startTabs={startTabs} middleTabs={middleTabs} endTabs={endTabs} />
      <Outlet/>
    </>
  )
}