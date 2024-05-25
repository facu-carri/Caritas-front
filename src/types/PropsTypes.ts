import { GeoPosition, LocationResponse, Tab } from "./Types"

export type agregarFilialProps = {
    geoPosition: GeoPosition,
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