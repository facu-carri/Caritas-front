/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Input from "src/components/Input"
import { getElementValue, validString } from "src/utils/api"
import { endPoints, routes, serverAddress } from "src/utils/constants"
import { User } from "src/utils/User"
import RoutesHandler from "src/utils/routesHandler"
import ErrorAlert from "src/components/ErrorAlert"
import BotonARuta from "src/components/BotonARuta"
import { RequestStatus } from "src/types/RequestStatus"
import { LoginQuery } from "src/types/LoginQuery"
import { Icons } from "src/utils/Icons"
import HiddePassword from "src/components/HiddePassword"

const Login = () => {

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
            .catch(() => setReqStatus(RequestStatus.FAILED))
    }

    return (
        <div className="flex justify-center items-center h-[100vh] text-[100%]">
            <div className="flex flex-col gap-4">
                {<ErrorAlert show={reqStatus == RequestStatus.FAILED}>
                    <span>Los datos son incorrectos</span>
                </ErrorAlert>}
                <Input id='email' text={'Email'} icon={Icons.username()}/>
                <HiddePassword showIcon={true} />
                <button className="btn btn-primary" onClick={handleLogin}>
                    {reqStatus == RequestStatus.PENDING ? <span className="loading loading-spinner"></span> : 'Ingresar'}
                </button>
                <BotonARuta nombre="Registrarse" ruta="/register"/>
            </div>
        </div>
    )
}

export default Login