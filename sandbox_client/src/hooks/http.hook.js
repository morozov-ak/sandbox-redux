import { useState, useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const auth = useContext(AuthContext)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            //console.log("data РЕГ:",data)
            setError(data.message)
            //console.log(response)
            if (!response.ok) {
                //console.log("data.e.message",data.e.message)
                if(data.e!==undefined){
                    console.log("defined")
                    if (data.e.message === "jwt expired") {
                        auth.logout()
                    }
                    throw new Error(data.message || 'Что-то пошло не так')
                }
                
            }
            setLoading(false)
            //console.log("data??")
            return data

        }
        catch (e) {
            setLoading(false)
            //setError(e)
            // console.log("e.message", e.message)
            // console.log("useHttp:",e.message)
            throw e

        }
    }, [auth])
    const clearError = useCallback(() => { setError(''); console.log('бляяяять', error) }, [error])
    return { loading, request, error, clearError }
} 