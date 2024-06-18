import { useQuery } from "react-query"
import Image from "src/components/Image"
import LoadingAnimation from "src/components/LoadingAnimation"
import { routes, serverAddress } from "src/utils/constants"
import { getHeaders } from "src/utils/request/httpRequests"

export default function Item({ id }) {
  
  const { data: item = {}, isLoading } = useQuery({
    queryKey: ['item', id],
    enabled: !!id,
    queryFn: () => fetch(`${serverAddress}/item/${id}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  console.log(item)
  
  return (
    <>
      {
        isLoading ?
        <LoadingAnimation />
        :
        <div className="p-32">
          <p className="text-2xl font-bold">{item.name}</p>
          <p className="text-sm text-gray-600">{item.itemCategory.name}</p>
          <p>de <a className="link text-blue-800" href={`${routes.exchanger.profile}/${item.owner.id}`}>{item.owner.name}</a></p>
          <Image photo={item.photo} />
          <p>{item.description}</p>
          <p>Cantidad restante: <span className="font-bold">{item.quantity}</span></p>
        </div>
      }
    </>
  )
}