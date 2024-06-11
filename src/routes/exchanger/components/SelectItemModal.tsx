import { useMemo } from "react";
import { useQuery } from "react-query";
import GenericForm from "src/components/GenericForm";
import { useCustomModal } from "src/context/CustomModalContext";
import { endPoints, serverAddress } from "src/utils/constants";
import { getHeaders, postData } from "src/utils/request/httpRequests";

export default function SelectItemModal({ itemId, categoryId, showConfirmation }) {

  const { closeModal } = useCustomModal()

  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => fetch(`${serverAddress}/${endPoints.inventory}`, {
      method: 'GET',
      headers: getHeaders()
    }).then(r => r.json())
  })

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => item.itemCategory.id === categoryId)
  }, [inventory, categoryId])

  const campos = useMemo(() => {
    const items = filteredInventory.map(item => ({
      key: item.id,
      value: `${item.name} | Cantidad: ${item.quantity}`
    }))
    if(items.length === 0) {
      return []
    }
    return [
      { nombre: 'Item', etiqueta: 'item', tipo: 'list', items }
    ]
  }, [filteredInventory])


  function fun({ item: hostItemId }) {
    const guestItemId = itemId
    showConfirmation(() => sendExchange({ hostItemId, guestItemId }))
  }

  function sendExchange({ hostItemId, guestItemId }) {
    postData(endPoints.exchange, null, {
      hostItemId: Number(hostItemId),
      guestItemId: Number(guestItemId)
    }).then(() => closeModal())
  }

  return (
    <GenericForm id="select-item-modal" campos={campos} listener={fun} error={null} />
  )
}