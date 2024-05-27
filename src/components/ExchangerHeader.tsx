import { ExchangerHeaderProps } from "src/types/PropsTypes";

export default function ExchangerHeader({ title, text, attrs, children }: ExchangerHeaderProps) {
    return (
        <header className={`pt-[100px] bg-blue-400 text-white p-4 text-center shadow-md ${attrs}`} >
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm">{text}</p>
            {children}
        </header>
    )
}