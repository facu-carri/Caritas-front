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
import { addDays, isBefore } from 'date-fns';
import {User} from "src/utils/User.tsx";
import { useEffect, useState } from "react";
import { getData, putData } from "src/utils/request/httpRequests";
import { format } from 'date-fns';
import RejectExchangeModal from "src/routes/admin/components/RejectExchangeModal";
import StarRating from "src/routes/exchanger/components/StarRating";
import AcceptNotificationModal from "src/routes/exchanger/components/inventory/AcceptNotificationModal";
import ExchangeHeader from "src/routes/helper/components/ExchangeHeader";
import ExchangeInfo from "src/routes/exchanger/components/ExchangeInfo";

export default function Exchange({ id }) {
  const { showModal, closeModal } = useCustomModal()

  const { setRoute } = RoutesHandler()
  const queryClient = useQueryClient()
  const user = User();
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



  function showConfirmationModal(onAccept) {
    showModal(<ConfirmationModal onAccept={onAccept} />)
  }

  const handleBack = () => setRoute(routes.admin.listarIntercambios)

  const exchangeDate = new Date(exchange.date); // Asegúrate de que exchange.date sea una cadena de texto con formato de fecha o un objeto Date
  const currentDate = new Date();

  const faltanMasDe24Hs = isBefore(addDays(currentDate, 1), exchangeDate);

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  
  const onCancelExchange = (exchange: Exchange) => {
    console.log('Cancel exchange', exchange)
    putData(`${endPoints.exchange}/cancel/${exchange.id}`)
    .then(() => {
        //setExchangeHistory(exchangeHistory.map(e => e.id === exchange.id ? {...e, state: 'Canceled'} : e))
    })
    .finally(/*() => closeModal()*/)
  }
  
  const onClickAccept = () => {
    console.log(exchange)
    showModal(
      <AcceptNotificationModal
        notificationData={exchange}
        onEditNotification={(data) => {
          console.log(data)
          //setNotificationData({ ...notificationData, ...data });
          closeModal();
        }}
      />
    )
  }
  const [freeLocations, setFreeLocations] = useState([]);
  
  useEffect(() => {
    getData(endPoints.nextFreeDay)
    .then(nextFreeDay => handleGetNextDay(nextFreeDay))
    .catch(/*err => handleError(err)*/)
  }, [])

  const handleGetNextDay = (nextFreeDay:string) => {
    getData(endPoints.freeLocations+"/"+nextFreeDay)
    .then(freeLocations => setFreeLocations(freeLocations))
    .catch(/*err => handleError(err)*/)
  }

  const soyGuest = () => { return exchange.guestItem.owner?.id == user.getId()}
  const soyHost = () => { return exchange.hostItem.owner?.id == user.getId()}
  const pertenezcoAlIntercambio = () => {return soyGuest() || soyHost()}

  const [cantEstrellas, setCantEstrellas] = useState(5);
  const onRatingChange = (nro) => {
    setCantEstrellas(nro)
  }

  const handleSendReview = () => {
    const today = format(Date(), 'yyyy-MM-dd')
    if (soyGuest()) {
      exchange.dateReviewGuest = today
      exchange.reviewGuest = inputValue
      exchange.starsGuest = cantEstrellas
      exchange.dateReviewHost = null
      exchange.reviewHost = null
      exchange.starsHost = null
    } else {
      exchange.dateReviewHost = today
      exchange.reviewHost = inputValue
      exchange.starsHost = cantEstrellas
      exchange.dateReviewGuest = null
      exchange.reviewGuest = null
      exchange.starsGuest = null
    }
    putData(`${endPoints.addReview}`, null, { ...exchange })
    .then(() => {
    })
  };

  const handleCancel = () => showModal(<RejectExchangeModal onClose={closeModal} exchangeId={exchange.id}/>)
  

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
          <div className="flex gap-2 justify-between">
            <p className="text-center text-xl">
              Intercambio: <span className={`font-bold ${exchange.state === 'Completed' ? 'text-700' : 'text-700'}`}>{parseExchangeStateName(exchange.state)}</span>
            </p>
          
          </div>
        }
      </div> 
    </div>
    </main>
  )
}