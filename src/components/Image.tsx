import { ImageProps } from "src/types/PropsTypes";

export default function Image({photo, alt, ...props}: ImageProps) {
    return (
        (photo && photo != '') ? <img src={`data:image/jpeg;base64,${photo}`} alt={alt} {...props}/> : <></>
    )
}