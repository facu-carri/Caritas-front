/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthEmployeeContextType = {
    auth: boolean
    setAuth: (auth:boolean) => void
}
export type AuthContextType = {
    token: string
}
export type CustomModalContextType = {
    showModal: (content:JSX.Element, onCloseFn?:() => void) => void
    closeModal: () => void
}
export type UserDataContextType = {
    userData: any
    setUserData: (data) => void
}
export type NotificationContextType = {
    showNotification: (content: JSX.Element) => void
    onClick: () => void
    closeNotification: () => void
}