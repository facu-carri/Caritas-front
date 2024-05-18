import GenericForm from "../GenericForm";

// Componente de Registro de Ayudante
export default function RegistroAyudante() {
    const campos = [
      { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text' },
      { nombre: 'apellido', etiqueta: 'Apellido', tipo: 'text' },
      { nombre: 'dni', etiqueta: 'DNI', tipo: 'text' },
      { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel' },
      { nombre: 'email', etiqueta: 'Email', tipo: 'email' },
      { nombre: 'repetirEmail', etiqueta: 'Repetir Email', tipo: 'email' },
      { nombre: 'contraseña', etiqueta: 'Contraseña', tipo: 'password' },
      { nombre: 'repetirContraseña', etiqueta: 'Repetir Contraseña', tipo: 'password' },
      { nombre: 'sedeAsignada', etiqueta: 'Sede Asignada', tipo: 'text' },
    ];
  
    return <GenericForm campos={campos} />;
}