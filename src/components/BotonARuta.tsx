// BotonARuta.jsx
import { useNavigate } from 'react-router-dom';

const BotonARuta = ({ nombre, ruta }) => {
    const navigate = useNavigate();

    const handleGoRoute = () => {
        navigate(ruta);
    };

    return (
        <div className="text-center">
            <p className="text-gray-600 mb-4">¿No tienes una cuenta?</p>
            <button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGoRoute}
            >
                {nombre}
            </button>
        </div>
    );
};

export default BotonARuta;
