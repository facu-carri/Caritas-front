export default function ManagerHeader({entidad, listaFiltrados}){
    return (
        <div className="space-y-2 sticky top-0 py-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Listado de {entidad}</h1>
            { listaFiltrados && 
                <p className="mx-auto max-w-[700px] md:text-xl text-gray-400 text-center">
                    Filtra por {listaFiltrados}
                </p>
            }
        </div>
    )
}