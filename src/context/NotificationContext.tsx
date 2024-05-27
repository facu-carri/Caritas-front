/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { CustomModalContextType, NotificationContextType } from "src/types/ContextTypes";

const notificationContext = React.createContext<NotificationContextType>(undefined)

export function useNotification(){
  return useContext(notificationContext)
}

export default function NotificationProvider({ children }) {

    const [notification, setNotification] = useState(null)

    const showNotification = (element: JSX.Element) => {
        setNotification(element)
    }

    const closeNotification = () => {
        
    }

    const onClick = () => {

    }

    return (
        <notificationContext.Provider value={{ showNotification, onClick, closeNotification }}>
            {children}
        </notificationContext.Provider>
    )
}