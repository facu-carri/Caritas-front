/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthEmployeeContextType = {
    auth: boolean,
    setAuth: (auth:boolean) => void
}
export type ConfirmationContextType = {
    showModal: boolean
    setShowModal: (show:boolean) => void
}
export type CustomModalContextType = {
    modal: boolean,
    setModal: any
}
export type LogoutContextType = {
    showLogoutModal: boolean
    setShowLogoutModal: (show:boolean) => void
}
export type UserDataContextType = {
    userData: any,
    setUserData: (data) => void
}