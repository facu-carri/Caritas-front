/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { UserDataContextType } from "src/types/TypeContext";

const UserDataContext = React.createContext<UserDataContextType>(undefined)

export function useUserData(){
    return useContext(UserDataContext)
}

export default function UserProvider({ children }) {

    const [userData, setUserData] = useState(false)

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    )
}