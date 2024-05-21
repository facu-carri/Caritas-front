import { Icons } from "src/Icons";

export default function ErrorAlert({ show }) {
    return <>
        {show &&
            <div role="alert" className="alert alert-error">
            {Icons.error}
            <span>Los datos son incorrectos</span>
            </div>
        }
    </>
}