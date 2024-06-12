import { useMutation, useQuery, useQueryClient } from "react-query";
import { endPoints, serverAddress } from "src/utils/constants";
import { getHeaders } from "src/utils/request/httpRequests";
import LoadingSpinner from "src/components/LoadingSpinner";
import Image from "src/components/Image";

export default function Exchange({ id }) {

  const queryClient = useQueryClient()

  const { data: exchange = {}, isLoading } = useQuery({
    queryKey: ['exchange', id],
    enabled: !!id,
    queryFn: () => fetch(`${serverAddress}/${endPoints.exchange}/${id}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  const { mutate: markAttendanceHost } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/markAttendanceHost/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  const { mutate: markAttendanceGuest } = useMutation({
    mutationFn: () => fetch(`${serverAddress}/${endPoints.exchange}/markAttendanceGuest/${id}`, {
      method: 'PUT',
      headers: getHeaders()
    }),
    onSuccess: () => queryClient.invalidateQueries(['exchange', id])
  })

  function handleCheckHost() {
    if(exchange.hostAsistio) {
      return;
    }
    markAttendanceHost()
  }

  function handleCheckGuest() {
    if(exchange.guestAsistio) {
      return;
    }
    markAttendanceGuest()
  }

  console.log(exchange)

  return (
    <div className='w-full h-full pt-48 flex items-center justify-center'>
      {
        isLoading ?
        <LoadingSpinner />
        :
        <div className="w-full mx-32 flex flex-col gap-8">
          <div className="flex justify-between px-16">
            <div>
              <div className="flex items-center gap-2">
                <label>Asistencia</label>
                <input type="checkbox" className="checkbox" checked={exchange.hostAsistio} onChange={() => handleCheckHost()} />
              </div>
              <ItemInfo item={exchange.hostItem} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <label>Asistencia</label>
                <input type="checkbox" className="checkbox" checked={exchange.guestAsistio} onChange={() => handleCheckGuest()} />
              </div>
              <ItemInfo item={exchange.guestItem} />
            </div>
          </div>
          <div className="flex justify-between">
            <button className="btn" disabled={!(exchange.hostAsistio && exchange.guestAsistio)}>Intercambio Exitoso</button>
            <button className="btn" disabled={!(exchange.hostAsistio && exchange.guestAsistio)}>Rechazar por Disgusto</button>
            <button className="btn" disabled={!(exchange.hostAsistio || exchange.guestAsistio)}>Rechazar por Ausencia</button>
          </div>
        </div> 
      }
    </div>
  )
}

function ItemInfo({ item }) {
  return (
    <div>
      <div>
        <p className="text-xl font-bold">{item.owner.name}</p>
        <p className="text-xs text-gray-700 font-light">{item.owner.email}</p>
      </div>
      <Image photo={item.photo} alt='imagen de item del anfitrion' className='w-48 h-48' />
      <p>{item.name}</p>
      <p className="text-xs text-gray-700 font-light">{item.itemCategory.name}</p>
      <p>{item.description}</p>
    </div>
  )
}