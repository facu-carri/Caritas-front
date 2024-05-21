/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { Icons } from "src/Icons"
import Input from "src/components/Input"
import { RequestStatus } from "src/libs/types/RequestStatus"
import { getElementValue, validString } from "src/libs/api"
import { endPoints, roles, routes, serverAddress } from "src/libs/constants"
import { handleResponse } from "src/libs/request/httpRequests"
import { ErrorCode } from "../../libs/Error/ErrorCode"
import { IErrorResponse } from "../../libs/Error/IErrorResponse"
import { ErrorCodeTypes } from "src/libs/Error/ErrorCodeTypes"
import { LoginQuery } from "./LoginQuery"
import { User } from "src/libs/User"
import RoutesHandler from "src/libs/routesHandler"

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [reqStatus, setReqStatus] = useState<RequestStatus>(RequestStatus.INITIAL)
    const [errorCode, setErrorCode] = useState<ErrorCode>(null)
    const { setUser } = User()
    const { setRoute } = RoutesHandler()

    function handleError(errCode: number) {
        const errorCode: ErrorCode = new ErrorCode(errCode ?? 0)
        setErrorCode(errorCode)
    }

    function checkStatus() {
        if (reqStatus == RequestStatus.SUCCESS) {
            setRoute(routes.main)
        }
        setReqStatus(RequestStatus.INITIAL)
    }

    const isInvalid = (loginQuery: LoginQuery) => {
        return !validString(loginQuery.email) || !validString(loginQuery.password)
    }

    const handleLogin = () => {
        const query: LoginQuery = {
            email: getElementValue('email'),
            password: getElementValue('password')
        }

        setErrorCode(null)

        if (isInvalid(query)) return

        setReqStatus(RequestStatus.PENDING)
        /*postData(endPoints.login, null, {
            email: query.email,
            password: query.password
        })
            .then((data) => setUser(data))
            .then(() => setReqStatus(RequestStatus.SUCCESS))
            .catch((err) => { setReqStatus(RequestStatus.FAILED); handleError(err) })
            .finally(() => checkStatus())*/
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
            .then(handleResponse)
            .then((data) => setUser(data))
            .then(() => setReqStatus(RequestStatus.SUCCESS))
            .catch((err) => { setReqStatus(RequestStatus.FAILED); handleError(err) })
            .finally(() => checkStatus())
    }

    return (
        <div className="flex justify-center items-center h-[100vh] text-[100%]">
            <div className="flex flex-col gap-4">
                <Input id='email' text={'Email'} icon={Icons.username()} showError={errorCode?.getType() == ErrorCodeTypes.USERNAME_ERROR} errorMsg={errorCode?.getMessage()}/>
                <Input id='password' text={'Password'} icon={Icons.password()} type={ showPassword ? "text" : "password"} showError={errorCode?.getType() == ErrorCodeTypes.PASSWORD_ERROR} errorMsg={errorCode?.getMessage()}>
                    {<button className="bg-transparent p-1" onClick={() => setShowPassword(!showPassword)}>{showPassword ? Icons.eyeHidden() : Icons.eye()}</button>}
                </Input> 
                <button className="btn btn-primary" onClick={handleLogin}>
                    {reqStatus == RequestStatus.PENDING ? <span className="loading loading-spinner"></span> : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default Login