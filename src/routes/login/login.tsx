/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { Icons } from "src/Icons"
import Input from "src/components/Input"
import RouteHandler from "src/components/RouteHandler"
import { useRoute } from "src/context/RouteContext"
import { RequestStatus } from "src/libs/RequestStatus"
import { getElementValue, validString } from "src/libs/api"
import { endPoints, routes } from "src/libs/constants"
import { getData } from "src/libs/httpPetitions"
import { ErrorCode } from "../../libs/Error/ErrorCode"
import { IErrorResponse } from "../../libs/Error/IErrorResponse"
import { ErrorCodeTypes } from "src/libs/Error/ErrorCodeTypes"
import { LoginQuery } from "./LoginQuery"

const Login = () => {

    const [show_password, showPassword] = useState(false)
    const [reqStatus, setReqStatus] = useState<RequestStatus>(RequestStatus.INITIAL)
    const [errorCode, setErrorCode] = useState<ErrorCode>(null)
    const { setRoute } = useRoute()

    function handleError(err: IErrorResponse | any) {
        const errorCode: ErrorCode = new ErrorCode(err?.code ?? 0)
        setErrorCode(errorCode)
    }

    function checkStatus(){
        if (reqStatus == RequestStatus.SUCCESS) {
            setRoute(routes.main)
        }
        setReqStatus(RequestStatus.INITIAL)
    }

    const isInvalid = (loginQuery: LoginQuery) => {
        return !validString(loginQuery.username) || !validString(loginQuery.password)
    }

    const handleLogin = () => {
        const query:LoginQuery = {
            username: getElementValue('username'),
            password: getElementValue('password')
        }

        setErrorCode(null)

        if (isInvalid(query)) return

        setReqStatus(RequestStatus.PENDING)
        getData(endPoints.login, query)
            .then(() => setReqStatus(RequestStatus.SUCCESS))
            .catch((err) => { setReqStatus(RequestStatus.FAILED); handleError(err) })
            .finally(() => checkStatus())
    }

    return (
        <>
            <RouteHandler/>
            <div className="flex flex-col gap-4">
                <Input id='username' text={'Username'} icon={Icons.username} showError={errorCode?.getType() == ErrorCodeTypes.USERNAME_ERROR} errorMsg={errorCode?.getMessage()}/>

                <Input id='password' text={'Password'} icon={Icons.password} type={ show_password ? "text" : "password"} showError={errorCode?.getType() == ErrorCodeTypes.PASSWORD_ERROR} errorMsg={errorCode?.getMessage()}>
                    {<button className="bg-transparent p-1" onClick={() => showPassword(!show_password)}>{show_password ? Icons.eyeHidden : Icons.eye}</button>}
                </Input> 

                <button className="btn btn-primary" onClick={() => handleLogin()}>
                    {reqStatus == RequestStatus.PENDING ? <span className="loading loading-spinner"></span> : 'Login'}
                </button>
            </div>
        </>
    )
}

export default Login