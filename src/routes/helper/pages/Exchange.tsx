import { useMutation, useQuery, useQueryClient } from "react-query";
import { endPoints, routes, serverAddress } from "src/utils/constants";
import { parseExchangeStateName } from "src/utils/parser";
import { getHeaders } from "src/utils/request/httpRequests";
import { useCustomModal } from "src/context/CustomModalContext";
import ConfirmationModal from "src/components/modals/Confirmation";
import LoadingAnimation from "src/components/LoadingAnimation";
import RoutesHandler from "src/utils/routesHandler";
import type { Exchange } from "src/types/Types";
import { FiRefreshCcw } from "react-icons/fi";
import ExchangeHeader from "../components/ExchangeHeader";
import ExchangeInfo from "../components/ExchangeInfo";

export default function Exchange({ id }) {

  const { showModal } = useCustomModal()
  const { setRoute } = RoutesHandler()
  const queryClient = useQueryClient()

  const { data: exchange = {} as Exchange, isLoading } = useQuery<Exchange>({
    enabled: !!id,
    queryKey: ['exchange', id],
    queryFn: () => fetch(`${serverAddress}/${endPoints.exchange}/${id}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  const { mutate: markAttendanceHost, isLoading: isMutatingHost } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/markAttendanceHost/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  const { mutate: markAttendanceGuest, isLoading: isMutatingGuest } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/markAttendanceGuest/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  function handleCheckHost() {
    if(isMutatingHost || exchange.hostAsistio) return
    showConfirmationModal(markAttendanceHost)
  }

  function handleCheckGuest() {
    if(isMutatingGuest || exchange.guestAsistio) return
    showConfirmationModal(markAttendanceGuest)
  }

  const { mutate: completeExchange, isLoading: isMutatingComplete } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/complete/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  const { mutate: rejectByDislike, isLoading: isMutatingDislike } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/notComplitedByDislike/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  const { mutate: rejectByNonAttendance, isLoading: isMutatingNonAttendence } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/notComplitedByNonAttendance/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  function showConfirmationModal(onAccept) {
    showModal(<ConfirmationModal onAccept={onAccept} />)
  }

  const isMutating = isMutatingComplete || isMutatingDislike || isMutatingNonAttendence

  const btnsDisabled = !(exchange.hostAsistio && exchange.guestAsistio) || isMutating

  const handleBack = () => setRoute(routes.main)

  return (
    isLoading ? <LoadingAnimation /> :
    <main className="pt-48">
    <div className='bg-gray-700/50 rounded-2xl p-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <ExchangeHeader code={exchange.authenticationCode} handleBack={handleBack}/>
      <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between px-16">
          <ExchangeInfo checked={exchange.hostAsistio} itemData={exchange.hostItem} onChange={handleCheckHost}/>
          <FiRefreshCcw className="self-center w-16 h-16 text-white" />
          <ExchangeInfo checked={exchange.guestAsistio} itemData={exchange.guestItem} onChange={handleCheckGuest}/>
        </div>
        {
          exchange.state === 'Accepted' ?
          <div className="flex gap-2 justify-between">
            <button className="btn" disabled={btnsDisabled} onClick={() => showConfirmationModal(completeExchange)}>
              Intercambio Exitoso
            </button>

            <button className="btn" disabled={btnsDisabled} onClick={() => showConfirmationModal(rejectByDislike)}>
              Rechazar por Disgusto
            </button>
            
            <button className="btn" disabled={(!exchange.hostAsistio && !exchange.guestAsistio) || (exchange.hostAsistio && exchange.guestAsistio)} onClick={() => showConfirmationModal(rejectByNonAttendance)}  >
              Rechazar por Ausencia
            </button>
          </div>
          :
          <p className="text-center text-xl">
            Intercambio: <span className={`font-bold ${exchange.state === 'Completed' ? 'text-green-500' : 'text-red-700'}`}>{parseExchangeStateName(exchange.state)}</span>
          </p>
        }
      </div> 
    </div>
    </main>
  )
}