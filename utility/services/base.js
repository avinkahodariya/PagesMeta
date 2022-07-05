import axios from 'axios'
import { APIPath } from "../constants"

const onSuccess = response => response.data

const onError = async error =>
    Promise.reject({
        error: error?.response?.data?.error || error?.response?.data,
        status: error?.response?.status,
    })

const request = async (options) => {
    const headers = {}

    // if (isSecure) {
    //     const token = AuthService.getToken()
    //     headers.Authorization = `Bearer ${token}`
    // }
   const client = axios.create({
        baseURL: APIPath.baseURL,
        headers: { ...headers },
    })

    return client(options).then(onSuccess).catch(onError)
}

export class BaseService {
    static get(url,isSecure = true) {
        return request(
            {
                url,
                method: 'GET',
            },
            isSecure,
        )
    }

    static post(url,data,isSecure = true) {
        return request(
            {
                url,
                method: 'POST',
                data,
            },
            isSecure,
        )
    }

    static put(url,data,isSecure = true) {
        return request(
            {
                url,
                method: 'PUT',
                data,
            },
            isSecure,
        )
    }

    static extenralAPICall(url) {
        const client = axios({
            url,
            method: 'GET',
            timeout: 1000 * 3,
        })
        return client.then(onSuccess).catch(onError)
    }

    static remove(url,isSecure = true) {
        return request(
            {
                url,
                method: 'DELETE',
            },
            isSecure,
        )
    }

}