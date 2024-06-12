import ExchangeInfo from "src/routes/helper/components/ExchangeInfo";
import { Exchange } from "src/types/Types";
import { parseExchangeStateName } from "src/utils/parser";

export const ExchangeCard = ({ exchange }: { exchange: Exchange }) => {
    return (
        <div className="bg-gray-700 w-fit p-4 md:p-6 space-y-5 gap-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
            <h1 className="text-2xl font-bold text-white">#{exchange.authenticationCode}</h1>
            <div className="grid grid-cols-2">
                <section>
                    <p className="text-sm font-medium text-gray-400">Fecha</p>
                    <p className="text-gray-50 font-medium">{exchange.date}</p>
                </section>
                <section>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sede</p>
                    <p className="text-gray-50 font-medium">{exchange.location?.name}</p>
                </section>
            </div>
            <div className="flex gap-10">
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-4">Solicitante</p>
                    <ExchangeInfo checked={false} itemData={{ ...exchange.guestItem, photo: '' }}/>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-4">Solicitado</p>
                    <ExchangeInfo checked={false} itemData={{ ...exchange.hostItem, photo: '' }}/>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-400">Estado</p>
                <p className="text-white font-medium">{parseExchangeStateName(exchange.state)}</p>
            </div>
        </div>
    );
};

/*
{ label: "Fecha del intercambio", value: exchange.date },
    { label: "Sede", value: exchange.location?.name },
    { label: "Solicitante", value: `${exchange.hostItem.owner?.name} | ${exchange.hostItem.owner?.email}` },
    { label: "Item del solicitante", value: exchange.hostItem.name },
    { label: "Solicitado", value: `${exchange.guestItem.owner?.name} | ${exchange.guestItem.owner?.email}` },
    { label: "Item solicitado", value: exchange.guestItem.name },
    { label: "Estado", value: parseExchangeStateName(exchange.state) },
    { label: "Codigo", value: exchange.authenticationCode },


    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Card className="w-full max-w-2xl">
        <CardContent className="grid gap-6 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha</p>
              <p className="text-gray-900 dark:text-gray-50 font-medium">2024-06-12</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sede</p>
              <p className="text-gray-900 dark:text-gray-50 font-medium">Depto Ale gay</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Solicitante</p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <img src="/placeholder.svg" alt="Momexa" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900 dark:text-gray-50 font-medium">Momexa</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">momexa9978@fna6.com</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRightIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Solicitado</p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <img src="/placeholder.svg" alt="galapo" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900 dark:text-gray-50 font-medium">galapo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">galapo2556@cnurbano.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item del solicitante</p>
              <p className="text-gray-900 dark:text-gray-50 font-medium">Alecraft</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item solicitado</p>
              <p className="text-gray-900 dark:text-gray-50 font-medium">EMT</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</p>
            <p className="text-red-500 dark:text-red-400 font-medium">
              No completado por ausencia de un intercambiador
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Código</p>
            <p className="text-gray-900 dark:text-gray-50 font-medium">Jh7El2g</p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-900 p-6 border-t">
          <div className="flex justify-end space-x-2">
            <Button variant="ghost">Cancelar</Button>
            <Button>Guardar</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

*/

