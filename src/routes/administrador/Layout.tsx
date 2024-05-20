/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from "src/Icons"
import Navbar, { Tab } from "src/components/admin/Navbar"
import { colors, routes } from "src/libs/constants"
import RoutesHandler from "src/libs/routesHandler"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Button, { ButtonType } from "src/components/Button"
import { FilialesOptions } from "./menu/Filiales"
import CircularDropdown from "src/components/DropDown"
import { User } from "src/libs/User"

export default function AdminLayout() {

  const { setRoute, getRoute, location } = RoutesHandler()
  const [showMenu, setShowMenu] = useState(false)
  const [menuOpts, setMenuOpts] = useState<Array<Tab>>([])
  const { logout } = User()

  useEffect(() => {
    const route = getRoute()

    switch (route) {
      case routes.admin.gestionarFiliales:
        setMenuOpts(FilialesOptions)
        break
      default:
        setMenuOpts([])
    }
  }, [location])

  const btnActive = (route:string) => {
    return getRoute() == route
  }

  const menu = () => {
    return (
      <div className="dropdown">
        <Button onClick={() => setShowMenu(!showMenu)}>
          {Icons.menu(colors.white)}
        </Button>
        {
          showMenu &&
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box w-52 gap-2">
            {
              menuOpts.map((tab, index) => (
                <Button onClick={tab?.onClick} key={'opts' + index}>
                  {tab.text}
                  {tab.icon}
                </Button>
              ))
            }
          </ul>
        }
      </div>
    )
  }

  const startTabs: Tab[] = [
    {
      icon: Icons.home(colors.white),
      onClick: () => setRoute(routes.main),
      active: false
    },
    {
      icon: Icons.menu(colors.white),
      customElement: <>{menuOpts.length > 0 && menu()}</>
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

  const dropdownItems: ButtonType[] = [
    {
      text: 'Cerrar sesion',
      onClick: () => logout()
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