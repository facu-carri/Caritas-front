import { Icons } from "src/utils/Icons"

type Type = {
    show: boolean,
    attrs?: string,
} & React.HTMLAttributes<HTMLDivElement>

export default function ErrorAlert({ show, attrs, children }: Type) {
    return <>
        {show &&
            <div role="alert" className={`alert alert-error ${attrs} mb-3`}>
            {Icons.error}
            {children}
            </div>
        }
    </>
}