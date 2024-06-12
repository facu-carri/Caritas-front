import Avatar from "react-avatar"
import Image from "./Image"
import { AvatarPhotoProps } from "src/types/PropsTypes";

export default function AvatarPhoto({ photo, name, showAvatar }: AvatarPhotoProps) {
    return (
        <div className="mt-1 h-14 w-14 max-w-14 max-h-14 mask mask-circle rounded-full overflow-hidden flex items-center">
            {
                !showAvatar && photo ? <Image className="select-none" photo={photo} alt={name} />
                :
                <Avatar className="select-none" name={name} size="56" round={true} />
            }
        </div>
    );
}