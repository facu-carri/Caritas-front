import CircularDropdown from "src/components/DropDown"
import { Icons } from "src/Icons"

export const NormalMain = () => {
  return (
    <h1 className="flex justify-center items-center h-[100vh] text-[100%]">
      USUARIO NORMAL
      <CircularDropdown icon={Icons.username()}/>
    </h1>

  )
}