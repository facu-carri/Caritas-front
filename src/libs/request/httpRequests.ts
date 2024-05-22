/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverAddress } from "../constants.ts"
import { Url } from "./url.ts"
import { getItem } from "../localStorage.ts"

const reqHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

function handleResponse(res: Response) {
    const type = res.headers.get('Content-Type')
    let data = null
    if (type?.includes('application/json')) { data = res.json() } else { data = res.text() }
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
        cache: 'no-cache',
        mode: 'cors',
        headers: {
            ...reqHeaders,
            'Authorization': `Bearer ${getItem('token')}`
        },
        body: JSON.stringify(data)
    })
    .then(handleResponse)
}

export function postData(endPoint: string, querys: Record<string, any> = null, data?: any) {
    const url = new Url(serverAddress, endPoint, querys)
    const request = fetch(url.toString(), {
        method: "POST",
        cache: 'no-cache',
        headers: {
            ...reqHeaders,
            'Authorization': `Bearer ${getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    return request.then(handleResponse)
}

export function putData(endPoint: string, querys: Record<string, any> = null, data?: any) {
    const url = new Url(serverAddress, endPoint, querys)
    const request = fetch(url.toString(), {
        method: "PUT",
        cache: 'no-cache',
        headers: {
            ...reqHeaders,
            'Authorization': `Bearer ${getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    return request.then(handleResponse)
}

export function deleteData(endPoint: string, querys: Record<string, any> = null) {
    const url = new Url(serverAddress, endPoint, querys)
    const request = fetch(url.toString(), {
        method: "DELETE",
        cache: 'no-cache',
        headers: {
            ...reqHeaders,
            'Authorization': `Bearer ${getItem('token')}`
        },
    })
    return request.then(handleResponse)
}