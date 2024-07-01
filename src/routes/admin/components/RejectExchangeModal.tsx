import { useEffect, useState } from "react";
import Button from "src/components/Button";
import { getData, getHeaders } from "src/utils/request/httpRequests";
import { endPoints, serverAddress } from "src/utils/constants";
import { getImageBase64 } from "src/components/GenericForm";
import { useMutation } from "react-query";
import { useCustomModal } from "src/context/CustomModalContext";
import ConfirmationModal from "src/components/modals/Confirmation";
import { parseExchangeStateName } from "src/utils/parser";

export default function RejectExchangeModal({ onClose, exchangeId }) {
  const [rejectReasonId, setRejectReasonId] = useState(0);

  const rejectReasons =[
    'Rechazado por disgusto',
    'Rechazado por preferencia a esperar por una mejor oferta',
    'Rechazado por falta de confianza al intercambiador']

  const { mutate: rejectNotification } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.rejectNotification}/${exchangeId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(parseExchangeStateName(rejectReasons[rejectReasonId-1]))
    }),
    onSuccess: () => {
      //queryInvalidator() TODO: Que es esto?
    }
  })
  const handleSend = () => {
    if (isDisabled) return;
    showConfirmationModal(rejectNotification);
    //onClose();
  };

  function showConfirmationModal(onAccept) {
    showModal(<ConfirmationModal onAccept={onAccept} />)
  }
  const { showModal, closeModal } = useCustomModal()

  const isDisabled = !rejectReasonId;

  return (
    <div className="w-2/5 items-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
      <div className="mt-3 text-center sm:mt-0 sm:text-left bg-white px-6 py-8">
        <h3 className="text-lg font-medium text-gray-900">Por favor seleccione una opcion de rechazo</h3>
        <div className="mt-5 flex flex-col gap-4">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={e => setRejectReasonId(Number(e.target.selectedIndex))}
            defaultValue={'default'}
          >
            <option disabled value={'default'}>Selecciona una opción</option>
            {
              rejectReasons.map((rejectReason) => <option key={rejectReason} value={rejectReason}>{rejectReason}</option>)
            }
          </select>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
        <Button onClick={handleSend} disabled={isDisabled}>Enviar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
}