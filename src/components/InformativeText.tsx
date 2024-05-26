import { InformativeTextProps } from "src/types/PropsTypes"

export const InformativeText = ({ icon, attrs, children, ...props }: InformativeTextProps) => {
    return (
        <div className="flex gap-2 items-center">
            {icon}
            <p className={`text-gray-400 ${attrs}`} {...props}>{children}</p>
        </div>
    )
}