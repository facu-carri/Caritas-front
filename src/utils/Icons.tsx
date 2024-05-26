import { Check } from "../assets/icons/Check"
import Email from "../assets/icons/Email"
import Search from "../assets/icons/Search"
import Password from "../assets/icons/Password"
import Username from "../assets/icons/Username"
import Eye from "../assets/icons/Eye"
import EyeHidden from "../assets/icons/EyeHidden"
import Home from "../assets/icons/Home"
import Menu from "../assets/icons/Menu"
import Error from "../assets/icons/Error"
import Map from "../assets/icons/Map"
import Loading from "../assets/icons/Loading"
import { Pencil } from "src/assets/icons/Pencil"
import { Store } from "src/assets/icons/Store"

const default_color = '#000000'

export const Icons = {
    username: (color:string = default_color) => <Username currentColor={color}/>,
    password: (color:string = default_color) => <Password currentColor={color}/>,
    email: (color:string = default_color) => <Email currentColor={color}/>,
    eye: (color:string = default_color) => <Eye currentColor={color}/>,
    eyeHidden: (color:string = default_color) => <EyeHidden currentColor={color}/>,
    search: (color:string = default_color) => <Search currentColor={color}/>,
    check: (color: string = default_color) => <Check currentColor={color} />,
    home: (color: string = default_color) => <Home currentColor={color} />,
    menu: (color: string = default_color) => <Menu currentColor={color} />,
    error: <Error/>,
    map: <Map/>,
    loading: <Loading />,
    pencil: <Pencil />,
    store: (color: string = default_color) => <Store currentColor={color} />
}