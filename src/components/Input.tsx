type Type = {
    text?: string,
    icon?: JSX.Element,
    showError?: boolean,
    errorMsg?: string,
    file?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ text, icon, showError = false, errorMsg, file, children, ...props }: Type) {
    return (
        <>
            {!file ?
                <label className={`relative ${file ? 'file' : 'input'} ${showError ? 'input-bordered input-warning' : ''} flex items-center gap-2`}>
                    {icon ? icon : ''}
                    <input type="text" className='grow' placeholder={text} {...props} />
                    {children}
                </label>
                :
                <input type="file" id="photo" accept="image/png, image/jpeg" className="grow file-input file-input-bordered w-full max-w-xs" {...props} />
            }
            {showError ? <h3>{errorMsg}</h3> : ''}
        </>
    )
}