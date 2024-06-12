
import { HelpersListProps } from 'src/types/PropsTypes';
import HelperItem from './HelperItem';

export default function HelpersList({ helpers, onSelect }: HelpersListProps){

  const getHelpers = () => {
    return helpers.map(helper => (
      <HelperItem key={helper.id} helper={helper} onSelect={onSelect} />
    ))
  }

  return (
    <div className='flex flex-col'>
      {
        helpers.length > 0 ? (
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {getHelpers()}
          </ul>
        ) : (
          <p className="text-red-500 text-center">No hay ayudantes registrados en el sistema.</p>
        )
      }
    </div>
  )
}