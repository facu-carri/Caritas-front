/* eslint-disable @typescript-eslint/no-explicit-any */
import { endPoints, serverAddress } from "../constants.ts"
import { Url } from "./url.ts"
import { getItem } from "../localStorage.ts"

const reqHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': getItem('token') && `Bearer ${getItem('token')}`
}

export const convertToString = (obj: Record<string, string>): string => {
    let urlStr = ''
    for (const key in obj) {
        const value = obj[key]
        if(value == null || value == undefined) continue
        urlStr += `${key}=${value}&`
    }
    return urlStr.slice(0, -1)
}

export function handleResponse(res: Response) {
    const type = res.headers.get('Content-Type')
    let data = null
    if (type.includes('application/json')) { data = res.json() } else { data = res.text() }
    if (res.ok) {
        return data
    } else {
        throw res.status
    }
}

export function getData(endPoint: string, querys: Record<string, string> = null, data?: any) {
    const url = new Url(serverAddress, endPoint, querys)
    return fetch(url.toString(), {
        method: "GET",
        mode: 'cors',
        headers: reqHeaders,
        body: JSON.stringify(data)
    })
    .then(handleResponse)
}

export function postData(endPoint: string, querys: Record<string, any> = null, data?: any) {
    const url = new Url(serverAddress, endPoint, querys)
    const request = fetch(url.toString(), {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(data),
    })
    return request.then(handleResponse)
}