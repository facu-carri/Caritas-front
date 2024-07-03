
import AvatarPhoto from 'src/components/AvatarPhoto';
import { HelperData } from 'src/types/Types';
//se encarga de representar un ayudante individual con las opciones de editar y eliminar.
export default function HelperItem({ helper, onSelect }: {helper:HelperData, onSelect: (data:unknown) => void}){
  return (
    <li className="flex h-fit w-full flex-row gap-2 border-b-2 border-r-2 rounded p-2 hover:scale-105 transform duration-200" onClick={() => onSelect(helper.id)}>
      <AvatarPhoto photo={helper.photo} name={helper.name}/>
      <div className="text-black flex flex-col justify-center mt-1">
        <h1 className="text-2xl font-bold">{helper.name}</h1>
        {helper.email && <p className="text-sm">{helper.email}</p>}
      </div>
    </li>
  );
}