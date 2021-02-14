
export const useHttp = () => {
    
    const request = async (url, method = 'GET', body = null, headers = {}) => {
        
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            
            if (!response.ok) {
                
                if(data.e!==undefined){
                    console.log("defined")
                    if (data.e.message === "jwt expired") {
                        
                    }
                    throw new Error(data.message || 'Что-то пошло не так')
                }
                
            }
            
            return data

        }
        catch (e) {
            
            throw e

        }
    
    }
    
    return { request }
} 