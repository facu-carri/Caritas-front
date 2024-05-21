import { Icons } from "src/Icons";

export default function ErrorAlert({ show, children }) {
    return <>
        {show &&
            <div role="alert" className="alert alert-error">
            {Icons.error}
            {children}
            </div>
        }
    </>
}