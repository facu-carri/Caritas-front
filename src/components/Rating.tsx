import { FaStar } from "react-icons/fa";
import { RatingProps } from "src/types/PropsTypes";
import { MaxStars } from "src/utils/constants";

export default function Rating({ max = MaxStars, qty }: RatingProps) {
    
    const getStars = () => {
        const stars: JSX.Element[] = []
        for (let i = 1; i <= max; i++){
            stars.push(<FaStar fill={i <= qty ? 'orange' : 'grey'} />)
        }
        return stars
    }

    return <div className="flex flex-row">
    {
        getStars()
    }
    </div>
}