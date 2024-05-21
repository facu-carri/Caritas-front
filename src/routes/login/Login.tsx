/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Icons } from "src/Icons"
import Input from "src/components/Input"
import { RequestStatus } from "src/libs/types/RequestStatus"
import { getElementValue, validString } from "src/libs/api"
import { endPoints, routes, serverAddress } from "src/libs/constants"
import { postData } from "src/libs/request/httpRequests"
import { LoginQuery } from "./LoginQuery"
import { User } from "src/libs/User"
import RoutesHandler from "src/libs/routesHandler"
import ErrorAlert from "src/components/ErrorAlert"
import BotonARuta from "src/components/BotonARuta"

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [reqStatus, setReqStatus] = useState<RequestStatus>(RequestStatus.INITIAL)
    const { setUser } = User()
    const { setRoute } = RoutesHandler()

    useEffect(() => {
        switch (reqStatus) {
            case RequestStatus.FAILED:
                resetState()
                break
            case RequestStatus.SUCCESS:
                setRoute(routes.main)
                break
        }
    }, [reqStatus])

    function resetState() {
        setTimeout(() => setReqStatus(RequestStatus.INITIAL), 5000)
    }

    const isInvalid = (loginQuery: LoginQuery) => {
        return !validString(loginQuery.email) || !validString(loginQuery.password)
    }

    const handleLogin = () => {
        const query: LoginQuery = {
            email: getElementValue('email'),
            password: getElementValue('password')
        }

        if (isInvalid(query)) return

        setReqStatus(RequestStatus.PENDING)

        /*postData(endPoints.login, null, query)
            .then((data) => setUser(data))
            .then(() => setReqStatus(RequestStatus.SUCCESS))
            .catch(() => setReqStatus(RequestStatus.FAILED))*/
        fetch(`${serverAddress}/${endPoints.login}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email: query.email,
                password: query.password
            })
        })
            .then(res => {
                if(!res.ok) {
                    setReqStatus(RequestStatus.FAILED)
                    throw new Error();
                }
                return res.json()
            })
            .then(data => setUser(data))
            .then(() => setReqStatus(RequestStatus.SUCCESS))
            .catch(() => {})
    }

    return (
        <div className="flex justify-center items-center h-[100vh] text-[100%]">
            <div className="flex flex-col gap-4">
                {<ErrorAlert show={reqStatus == RequestStatus.FAILED}>
                    <span>Los datos son incorrectos</span>
                </ErrorAlert>}
                <Input id='email' text={'Email'} icon={Icons.username()}/>
                <Input id='password' text={'Password'} icon={Icons.password()} type={ showPassword ? "text" : "password"}>
                    {<button className="bg-transparent p-1" onClick={() => setShowPassword(!showPassword)}>{showPassword ? Icons.eyeHidden() : Icons.eye()}</button>}
                </Input> 
                <button className="btn btn-primary" onClick={handleLogin}>
                    {reqStatus == RequestStatus.PENDING ? <span className="loading loading-spinner"></span> : 'Login'}
                </button>
                <BotonARuta nombre="Registrarse" ruta="/register"/>
            </div>
        </div>
    )
}

export default Login