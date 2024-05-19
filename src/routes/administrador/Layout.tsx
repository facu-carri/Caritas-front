/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from "src/Icons"
import Navbar, { Tab } from "src/components/admin/Navbar"
import { colors, routes } from "src/libs/constants"
import RoutesHandler from "src/libs/routesHandler"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "src/components/Button"
import { FilialesOptions } from "./menu/Filiales"

export default function AdminLayout() {

  const { setRoute, getRoute } = RoutesHandler()
  const [showMenu, setShowMenu] = useState(false)
  const [menuOpts, setMenuOpts] = useState<Array<Tab>>([])

  useEffect(() => {
    const route = getRoute()
    let options: Tab[] = []

    switch (route) {
        case routes.admin.gestionarFiliales:
          options = FilialesOptions
        break
    }
    setMenuOpts(options)
  }, [])

  const btnActive = (route:string) => {
    return getRoute() == route
  }

  const menu = () => {
    return (
      <div className="dropdown">
        <Button icon={Icons.menu(colors.white)} onClick={() => setShowMenu(!showMenu)} />
        {
          showMenu &&
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box w-52">
            {
              menuOpts.map((tab, index) => (
                <Button text={tab?.text} icon={tab?.icon} onClick={tab?.onClick} key={index}/>
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

  const endTabs: Tab[] = [
    {
      icon: Icons.username(colors.white),
      onClick: () => {}
    }
  ]

  return (
    <>
      <Navbar startTabs={startTabs} middleTabs={middleTabs} endTabs={endTabs} />
      <Outlet/>
    </>
  )
}