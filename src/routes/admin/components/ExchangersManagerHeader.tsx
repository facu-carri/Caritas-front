export default function ExchangersManagerHeader(){
    return (
        <div className="space-y-2 sticky top-0 py-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Listado de Usuarios</h1>
            <p className="mx-auto max-w-[700px] md:text-xl text-gray-400">
                Filtra por nombre, email, teléfono o DNI.
            </p>
        </div>
    )
}