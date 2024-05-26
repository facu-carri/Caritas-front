import { ConfirmationProps } from "src/types/PropsTypes"
import Button from "../Button"
import { useCustomModal } from "src/context/CustomModalContext"

export default function ConfirmationModal({ title, onAccept, onCancel }: ConfirmationProps) {

    const { closeModal } = useCustomModal()
    
    return (
        <div className="modal-box text-[100%]">
        <h3 className="font-bold text-lg text-center">
            {title ?? `¿Estás seguro de que quieres proceder?`}
            <br />
            {`Esta acción no se puede deshacer`}
        </h3>
        <div className="flex justify-center items-center mt-3">
            <div className="flex flex-row gap-4">
                <Button onClick={onCancel}>Cancelar</Button>
                    <Button onClick={() => { onAccept(); closeModal() }}>Aceptar</Button>
            </div>
        </div>
        </div>
    )
}