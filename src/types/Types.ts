import { ButtonProps } from "./PropsTypes"

export type ExchangerData = {
    id: number
    name: string
    email: string
    dni: string
    phone: string
    photo: string
    stars: number
    absentees: number
}
export type GeoPosition = {
    lat: number,
    lng: number
}
export type Location = {
    id?: string
    description?: string
    geoPosition: GeoPosition
}
export type LocationResponse = {
    id: string,
    description: string,
    coordinates: string
}
export type Tab = {
    text?: string,
    onClick?: () => void,
    icon?: JSX.Element,
    active?: boolean,
    visible?: boolean
    customElement?: JSX.Element
}
export type DropdownItem = {
    text?: string,
    icon?: string
} & ButtonProps
export type Dropdown = {
    icon?: JSX.Element,
    items: Array<DropdownItem>
}
export type LocationFields = {
    description: string
}
export type NotificationType = 'error' | 'warning'