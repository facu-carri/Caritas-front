import GenericForm from "../GenericForm";

export default function RegistrarFilial() {
    const campos = [
      { nombre: 'numero', etiqueta: 'Numero', tipo: 'text' },
      { nombre: 'ubicación', etiqueta: 'Ubicacion', tipo: 'text' },
      { nombre: 'descripción', etiqueta: 'Descripcion', tipo: 'text' },
    ];
    return <GenericForm campos={campos} />;
}