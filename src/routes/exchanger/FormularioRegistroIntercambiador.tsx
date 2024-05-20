import React from 'react';

// Componente de formulario de registro
function FormularioRegistroIntercambiador() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Regístrate</h1>
        <p className="text-gray-500 dark:text-gray-400">Completa el formulario para crear una nueva cuenta.</p>
      </div>
      <RegistrationFields />
    </div>
  );
}

// Componente para los campos de registro
function RegistrationFields() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="first-name">Nombre</FormLabel>
          <FormInput id="first-name" placeholder="Ingresa tu nombre" required />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="last-name">Apellido</FormLabel>
          <FormInput id="last-name" placeholder="Ingresa tu apellido" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel htmlFor="dni">DNI</FormLabel>
          <FormInput id="dni" placeholder="Ingresa tu DNI" required />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="phone">Teléfono</FormLabel>
          <FormInput id="phone" placeholder="Ingresa tu teléfono" required />
        </div>
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="email">Correo electrónico</FormLabel>
        <FormInput id="email" placeholder="Ingresa tu correo" required type="email" />
      </div>
      <div className="space-y-2">
        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <FormInput id="password" placeholder="Ingresa tu contraseña" required type="password" />
      </div>
      <SubmitButton className="w-full">Registrarse</SubmitButton>
    </form>
  );
}

// Componente de etiqueta de formulario
function FormLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block font-medium">{children}</label>;
}

// Componente de entrada de formulario
function FormInput({ id, placeholder, required, type }) {
  return (
    <input
      id={id}
      placeholder={placeholder}
      required={required}
      type={type}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
    />
  );
}

// Componente de botón de envío de formulario
function SubmitButton({ className, children }) {
  return (
    <button type="submit" className={"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md " + className}>
      {children}
    </button>
  );
}

// Componente de enlace
function CustomLink({ className, href, children }) {
  return <a href={href} className={className}>{children}</a>;
}

export default FormularioRegistroIntercambiador;
