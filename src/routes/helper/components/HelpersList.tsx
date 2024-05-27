
import { HelpersListProps } from 'src/types/PropsTypes';
import HelperItem from './HelperItem';

export default function HelpersList({ helpers, onEdit, onDelete, onSelect }: HelpersListProps){

  const getHelpers = () => {
    return helpers.map(helper => (
      <HelperItem key={helper.id} helper={helper} onEdit={onEdit} onDelete={onDelete} onSelect={onSelect} />
    ))
  }

  return (
    <>
      {
        helpers.length > 0 ? <ul>{getHelpers()}</ul> :
        <p className="text-red-500 text-center">No hay ayudantes registrados en el sistema.</p>
      }
    </>
  )
}