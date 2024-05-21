import { Icons } from "src/Icons";

type Type = {
    show: boolean,
    attrs?: string,
} & React.HTMLAttributes<HTMLDivElement>

export default function ErrorAlert({ show, attrs, children }: Type) {
    return <>
        {show &&
            <div role="alert" className={`alert alert-error ${attrs}`}>
            {Icons.error}
            {children}
            </div>
        }
    </>
}