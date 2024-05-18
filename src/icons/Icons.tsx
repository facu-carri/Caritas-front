import { Check } from "./Check"
import Email from "./Email"
import Search from "./Search"
import Password from "./Password"
import Username from "./Username"
import Eye from "./Eye"
import EyeHidden from "./EyeHidden"

const color = '#000000'

export const Icons = {
    username: <Username currentColor={color}/>,
    password: <Password currentColor={color}/>,
    email: <Email currentColor={color}/>,
    eye: <Eye currentColor={color}/>,
    eyeHidden: <EyeHidden currentColor={color}/>,
    search: <Search currentColor={color}/>,
    check: <Check currentColor={color}/>,
}