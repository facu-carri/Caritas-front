import { ExchangerCardData, ExchangerData, GeoPosition, Location, LocationResponse, MouseEvent, Tab } from "./Types"

export type AgregarFilialProps = {
    geoPosition: GeoPosition
    handleSuccess: (loation: LocationResponse) => void
}
export type EditarFilialProps = {
    location: Location
    handleSuccess: (loation: LocationResponse) => void
}
export type NavbarProps = {
    startTabs?: Tab[]
    middleTabs?: Tab[]
    endTabs?: Tab[]
}
export type ButtonProps = {
    active?: boolean
    visible?: boolean
    onClick?: (ev:MouseEvent) => void
    attrs?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export type ConfirmationProps = {
    title?: string,
    onAccept: (ev:MouseEvent) => void
    onCancel: (ev:MouseEvent) => void
}
export type InformativeTextProps = {
    icon?: JSX.Element
    attrs?: string
} & React.HTMLAttributes<HTMLParagraphElement>
export type ExchangerCardProps = {
    cardData: ExchangerCardData
    onEdit: (data:ExchangerData) => void
    onDelete: (id:string) => void
}
export type ProfileProps = {
    id: string
}