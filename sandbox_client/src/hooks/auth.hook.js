import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../redux/actions';
import { AUTH_LOGIN } from "../redux/types";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)
  const dispatch = useDispatch()
  
  const login = useCallback((jwtToken, id,name) => {
    setToken(jwtToken)
    setUserId(id)
    setUserName(name)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken,name:name
    }))
  }, [])

  
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])
  




  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      dispatch(checkAuth(data.token))
      dispatch({type:AUTH_LOGIN, payload: data})
    }
    setReady(true)
  }, [login,dispatch])


  return { login, logout, token, userId, ready, userName }
}
