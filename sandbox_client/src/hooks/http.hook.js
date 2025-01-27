
export const request = async (url, method = 'GET', body = null, headers = {}) => {
        
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            if(response.status===500){throw response}
            //console.log("response", response)
            const data = await response.json()
            if (data.e) {
                throw data
            }
            return data
        }
        catch (error) {
            return error
        }
    
    }

// export const useHttp = () => {
    
//     const request = async (url, method = 'GET', body = null, headers = {}) => {
        
//         try {
//             if (body) {
//                 body = JSON.stringify(body)
//                 headers['Content-Type'] = 'application/json'
//             }
//             const response = await fetch(url, { method, body, headers })
//             const data = await response.json()
//             if (data.e) {
//                 throw data
//             }
//             return data
//         }
//         catch (error) {
//             return error
//         }
    
//     }
//     return { request }
// } 