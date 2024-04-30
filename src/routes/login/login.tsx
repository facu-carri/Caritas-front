/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { useRoute } from "src/context/RouteContext"

const Login = () => {

    const { setRoute, route } = useRoute()
    const navigate = useNavigate()

    const changeUrl = () => {
        navigate(route)
    }

    return (
        <>
            <div className="flex flex-col">
                <div>
                    <h3>Usuario</h3>
                    <input></input>
                </div>
                <div>
                    <h3>Password</h3>
                    <input></input>
                </div>
                <button onClick={() => {setRoute('/'); changeUrl()}}>Login</button>
            </div>
        </>
    )
}

export default Login