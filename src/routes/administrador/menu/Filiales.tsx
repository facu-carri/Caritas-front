import { Tab } from "src/components/admin/Navbar";
import AgregarFiliales from "src/components/filiales/AgregarFiliales";
import EliminarFiliales from "src/components/filiales/EliminarFiliales";

export default function FilialesOptions() {

    const FilialesOpts: Tab[] = [
        {
            text: 'Agregar filiales',
            customElement: <AgregarFiliales/>
        },
        {
            text: 'Eliminar filiales',
            customElement: <EliminarFiliales/>
        }
    ]

    return FilialesOpts
}