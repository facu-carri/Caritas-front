import { useState } from "react"
import { Icons } from "src/utils/Icons"
import Input from "./Input"
import { HiddePasswordProps } from "src/types/PropsTypes"

export default function HiddePassword({ showIcon, ...props }: HiddePasswordProps) {

    const [ showPassword, setShowPassword ] = useState(false)

    return (
        <Input id='password' text={'Contraseña'} icon={showIcon && Icons.password()} type={showPassword ? "text" : "password"} {...props}>
            <button className="bg-transparent p-1" onClick={() => setShowPassword(!showPassword)}>{showPassword ? Icons.eyeHidden() : Icons.eye()}</button>
        </Input>
    )
}