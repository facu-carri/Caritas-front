import Maps from "src/routes/maps/Map";

export const Information = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 pt-20">
      <div className="max-w-3xl px-6 py-12 text-center">
        <h1 className="mb-8 mt-4 text-4xl font-serif font-bold tracking-tight text-gray-100">
          Caritas
        </h1>
        <p className="mx-auto mb-8 w-full text-lg font-medium leading-relaxed text-gray-400">
          En Caritas Internationalist, entendemos que muchas personas tienen bienes o servicios que desean intercambiar, pero a menudo se enfrentan a diversas barreras.
          Para superar estos obstáculos, hemos desarrollado una plataforma innovadora que facilita el intercambio de bienes y servicios de manera segura y eficiente.
          Nuestra plataforma está diseñada para ofrecer una experiencia de intercambio sin complicaciones, respaldada por un equipo de ayudantes dedicados y un administrador que aseguran que cada transacción se realice sin inconvenientes.
          El principal beneficio para nuestros usuarios es la facilidad y seguridad con la que pueden llevar a cabo sus intercambios.
        </p>
        <h3 className="mt-4 text-2xl font-serif font-bold tracking-tight text-gray-100">
          Nuestras ubicaciones
        </h3>
        <Maps/>
      </div>
      <footer className="mb-8 text-lg font-medium leading-relaxed text-gray-400">Para más información, contáctenos en: SoySolutions@gmail.com</footer>
    </div>
  )
}