import EliminarFilialModal from "src/components/modals/EliminarFilial";
import { Tab } from "./Navbar";
import AgregarFilialModal from "src/components/modals/AgregarFilial";

export default function FilialesOptions() {

    const FilialesOpts: Tab[] = [
        {
            text: 'Agregar filiales',
            customElement: <AgregarFilialModal/>
        },
        {
            text: 'Eliminar filiales',
            customElement: <EliminarFilialModal/>
        }
    ]

    return FilialesOpts
}