import { Check } from "./icons/Check"
import Email from "./icons/Email"
import Search from "./icons/Search"
import Password from "./icons/Password"
import Username from "./icons/Username"
import Eye from "./icons/Eye"
import EyeHidden from "./icons/EyeHidden"
import Home from "./icons/Home"

const default_color = '#000000'

export const Icons = {
    username: (color:string = default_color) => <Username currentColor={color}/>,
    password: (color:string = default_color) => <Password currentColor={color}/>,
    email: (color:string = default_color) => <Email currentColor={color}/>,
    eye: (color:string = default_color) => <Eye currentColor={color}/>,
    eyeHidden: (color:string = default_color) => <EyeHidden currentColor={color}/>,
    search: (color:string = default_color) => <Search currentColor={color}/>,
    check: (color: string = default_color) => <Check currentColor={color} />,
    home: (color:string = default_color) => <Home currentColor={color}/>,
}