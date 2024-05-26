import { GeoPosition, Location, LocationResponse, Tab } from "./Types"

export type AgregarFilialProps = {
    geoPosition: GeoPosition,
    handleSuccess: (loation: LocationResponse) => void
}
export type EditarFilialProps = {
    location: Location,
    handleSuccess: (loation: LocationResponse) => void
}
export type NavbarProps = {
    startTabs?: Tab[]
    middleTabs?: Tab[]
    endTabs?: Tab[]
}
export type ButtonProps = {
    active?: boolean,
    visible?: boolean,
    onClick?: () => void,
    attrs?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export type ConfirmationProps = {
    title?: string,
    onAccept: () => void
    onCancel: () => void
}