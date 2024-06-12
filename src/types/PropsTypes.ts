import { ErrorCode } from "src/utils/Error/ErrorCode"
import { ExchangerCardData, GeoPosition, HelperData, ItemData, Location, LocationResponse, MouseEvent, Tab, UserData, UserInfoFields } from "./Types"

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
    onCancel?: (ev:MouseEvent) => void
}

export type InformativeTextProps = {
    icon?: JSX.Element | JSX.Element[] | string
    attrs?: string
} & React.HTMLAttributes<HTMLParagraphElement>

export type ExchangerCardProps = {
    cardData: ExchangerCardData
}

export type ProfileProps = {
    id?: string
}

export type ItemModalProps = {
    item: ItemData
}

export type ItemCardProps = {
    item: ItemData
    hiddeBtns?: boolean
    hiddeOwner?: boolean
    canEdit?: boolean
    canDelete: boolean
    onClick?: (ev:MouseEvent) => void
    queryInvalidator?: () => void
}

export type ItemListInventoryProps = {
    ruta: string
    inventory?: ItemData[]
    canEdit?: boolean
    children?: JSX.Element[] | JSX.Element
}

export type UserProfileProps = {
    userData: UserData
    profileInfo: UserInfoFields[]
    handleEdit?: VoidFunction
    canEdit: boolean
    handleBan?: VoidFunction
    canBan?: boolean
    handleDelete?: VoidFunction
    canDelete: boolean
    canDeletePhoto?: boolean
    showPhoto?: boolean
    children?: JSX.Element[] | JSX.Element
}

export type EditItemModalProps = {
    onEditItem: (data:ItemData) => void
    //onDeleteItem: VoidFunction
    itemData: ItemData
}

export type ExchangerHeaderProps = {
    title: string
    text?: string
    attrs?: string
    children?: JSX.Element[] | JSX.Element
}

export type RatingProps = {
    max?: number
    qty: number
}

export type ImageProps = {
    photo: string
    alt?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

export type HelpersListProps = {
    helpers: HelperData[]
    onSelect: (id:number|string) => void
}

export type InputTypeProps = {
    text?: string,
    icon?: JSX.Element,
    showError?: boolean,
    errorMsg?: string,
    file?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export type HiddePasswordProps = {
    showIcon?: boolean
} & InputTypeProps & React.InputHTMLAttributes<HTMLInputElement>

export type GenericFormProps = {
    id: string,
    campos: Array<FormField>,
    listener?: (values: Record<string, unknown>|unknown) => void
    error?: ErrorCode,
    hideImg?: boolean
    btnText?: string
    showConfirm?: boolean
    children?: JSX.Element[] | JSX.Element
}
export type FormField = {
    nombre: string,
    etiqueta: string,
    tipo: string,
    value?: string|number,
    image?: boolean,
    items?: ListItem[],
    optional?: boolean
}
  
export type ListItem = {
    key: string|number,
    value: string
}

export type EditProfileProps = {
    campos: FormField[],
    onSave: (data) => Promise<unknown>,
    showConfirm?: boolean
}

export type AvatarPhotoProps = {
    photo: string;
    name: string;
    showAvatar?: boolean;
};