/* eslint-disable @typescript-eslint/no-explicit-any */
type Type = {
    text?: string,
    icon?: JSX.Element,
    active?: boolean,
    visible?: boolean,
    onClick?: () => void,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ text, icon, active, visible, onClick, ...props }: Type) {
    return (
        <button className={`btn btn-ghost ${active && 'btn-active'} ${visible == false && 'hidden'} text-xl`} onClick={onClick} {...props}>
            {icon ?? null}
            {text ?? null}
        </button>
    )
}