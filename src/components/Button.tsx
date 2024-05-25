import { ButtonProps } from "src/types/PropsTypes";

export default function Button({ active, visible, onClick, children, attrs, ...props }: ButtonProps) {
    return (
        <button className={`btn btn-ghost ${active && 'btn-active'} ${visible == false && 'hidden'} text-base ${attrs}`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}