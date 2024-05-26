import { ButtonProps } from "./PropsTypes"

export type VoidFunction = () => void
export type MouseEvent = React.MouseEvent<HTMLElement>
export type ExchangerData = {
    id: string
    name: string
    email: string
    dni: string
    phone: string
    photo: string
    stars: number
    password?: string,
    birdthdate?: string
    absentees: number
}
export type GeoPosition = {
    lat: number,
    lng: number
}
export type Location = {
    id?: string
    name?: string
    geoPosition: GeoPosition
}
export type LocationResponse = {
    id: string,
    name: string,
    coordinates: string
}
export type Tab = {
    text?: string,
    onClick?: VoidFunction,
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