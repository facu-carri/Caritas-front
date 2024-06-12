import { IoReturnDownBack } from "react-icons/io5";
import Button from "src/components/Button";

export default function ExchangeHeader({handleBack}) {
    return <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold text-white">Intercambio #AAA3356</h1>
    <div className="flex items-center space-x-4">
      <Button
        attrs="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"
          onClick={handleBack}
      >
        {IoReturnDownBack({className: 'w-5 h-5'})}
        Volver a la lista
      </Button>
    </div>
  </div>
}