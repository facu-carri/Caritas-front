import Image from "src/components/Image"
import ExchangerCard from "src/routes/admin/components/ExchangerCard"
import { ItemData } from "src/types/Types"

export default function ExchangeInfo({checked, itemData, onChange}: {checked: boolean, itemData: ItemData, onChange: () => void}) {
    return (
      <section className="w-[300px]">
        <ExchangerCard removeClick={true} cardData={{
          name: itemData.owner.name,
          email: itemData.owner.email,
          photo: itemData.owner.photo,
          id: itemData.owner.id,
          stars: null, absentees: null, dni: '', phone: '', birthdate: ''
        }}>
          <div className="flex items-center gap-2 absolute top-2 right-3">
            <label>Asistencia</label>
            <input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
          </div>
          <ItemInfo item={itemData} />
        </ExchangerCard>
      </section>
    )
  }
  
  function ItemInfo({ item }) {
    return (
      <section className="mt-4">
        <Image photo={item.photo} alt='imagen de item del anfitrion' className='w-48 h-48 mb-4 rounded shadow-2xl max-h-64' />
        <p className="text-xl font-bold mb-2">{item.name}</p>
        <p className="text-sm text-gray-500 mb-2">{item.itemCategory.name}</p>
        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
      </section>
    )
  }