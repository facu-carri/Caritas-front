type Type = {
    text: string,
    icon?: JSX.Element,
    showError?: boolean,
    errorMsg?: string,
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ text, icon, showError = false, errorMsg, children, ...props }: Type) {
    return (
        <>
            <label className={`relative input ${showError ? 'input-bordered input-warning' : ''} flex items-center gap-2`}>
                {icon ? icon : ''}
                <input type="text" className="grow" placeholder={text} {...props} />
                {children}
            </label>
            {showError ? <h3>{errorMsg}</h3> : ''}
        </>
    )
}