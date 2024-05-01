/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { RouteContextType } from "./types/RouteContextType";

const RouteContext = React.createContext<RouteContextType>(undefined)

export function useRoute(){
  return useContext(RouteContext)
}

export default function RouteProvider({ children }) {

  const [route, setRoute] = useState(null)

  return (
    <RouteContext.Provider value={{ route: route, setRoute: setRoute }}>
      {children}
    </RouteContext.Provider>
  )
}