import { FaStar } from "react-icons/fa";
import { RatingProps } from "src/types/PropsTypes";

export default function Rating({ max, qty }: RatingProps) {
    
    const getStars = () => {
        const starts: JSX.Element[] = []
        for (let i = 1; i <= max; i++){
            starts.push(<FaStar fill={i <= qty ? 'orange' : 'grey'} />)
        }
        return starts
    }

    return <div className="flex flex-row">
    {
        getStars()
    }
    </div>
}