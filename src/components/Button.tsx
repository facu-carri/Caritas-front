/* eslint-disable @typescript-eslint/no-explicit-any */
export type ButtonType = {
    text?: string,
    icon?: JSX.Element,
    active?: boolean,
    visible?: boolean,
    onClick?: () => void,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ active, visible, onClick, children, ...props }: ButtonType) {
    return (
        <button className={`btn btn-ghost ${active && 'btn-active'} ${visible == false && 'hidden'} text-base`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}