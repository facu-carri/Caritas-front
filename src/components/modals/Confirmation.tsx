import { ConfirmationProps } from "src/types/PropsTypes"
import Button from "../Button"
import { useCustomModal } from "src/context/CustomModalContext"
import { MouseEvent } from "src/types/Types"

export default function ConfirmationModal({ title, onAccept, onCancel }: ConfirmationProps) {

    const { closeModal } = useCustomModal()
    
    const processTitle = () => {
        const titleParts = title.split('\n')
        return titleParts.map((titlePart, index) => (
            <h3>
                {titlePart}
                {index < titleParts.length - 1 && <br />}
            </h3>
        ))
    }

    return (
        <div className="modal-box text-[100%]">
            <h3 className="font-bold text-lg text-center">
            <h3>¿Está seguro de que quiere proceder?</h3>
            {
                title && processTitle()
            }
            {`Esta acción no se puede deshacer`}
        </h3>
        <div className="flex justify-center items-center mt-3">
            <div className="flex flex-row gap-4">
                <Button onClick={onCancel}>Cancelar</Button>
                <Button onClick={(ev:MouseEvent) => { onAccept(ev); closeModal() }}>Aceptar</Button>
            </div>
        </div>
        </div>
    )
}