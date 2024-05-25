/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthEmployeeContextType = {
    auth: boolean,
    setAuth: (auth:boolean) => void
}
export type AuthContextType = {
    token: string,
}
export type CustomModalContextType = {
    setModal: (content:JSX.Element) => void,
    closeModal: () => void,
    showModal: () => void
}
export type UserDataContextType = {
    userData: any,
    setUserData: (data) => void
}