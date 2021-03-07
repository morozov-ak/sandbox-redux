import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { reduxLogin } from '../redux/actions.js'
import {useHistory} from 'react-router-dom'
import { request } from '../hooks/http.hook'
import { message } from '../utilites/message.js'



export const AuthPage = () => {
    const history=useHistory()
    //const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    ///const {request} = useHttp()
    const[form,setForm]=useState({
        email:'',password:'',name:''
    })


    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const switchToPass = async () => {
        const input = document.getElementById('password');
        input.focus();
        input.select();
    }

    const sendMail = async () => {
        try {
            await request('/api/auth/send', 'POST', { ...form })
            message(`Отправлен пароль для: ${form.email} `)
            
        }
        catch (e) { }
    }


    


    
    return(
        
    <div className="rel">   
        <div className="auth" onSubmit={(event)=>{event.preventDefault()}}>
            
            <div className="SiteLogoName">SandBOX</div>
            
            
            <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input name="email" onKeyPress={(e)=>{if(e.key==="Enter"){switchToPass()}}} onChange={changeHandler} type="email" className="form-control" id="email" placeholder="email@example.com"/>
            </div>
            

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input name="password" onKeyPress={(e)=>{if(e.key==="Enter"){dispatch(reduxLogin(form))}}} onChange={changeHandler} type="password" className="form-control" id="password" placeholder="От 6 символов"/>
            </div>
            <div className="auth-buttons">
                <button  onClick={()=>{dispatch(reduxLogin(form))}} className="btn btn-primary mybtn">Войти</button>
                <button  onClick={()=>{history.push('/RegistrationPage')}} className="btn btn-success mybtn">Зарегистрироваться</button>
                <button  onClick={sendMail} className="btn btn-warning mybtn">Забыл пароль</button>
            </div>
            
        </div>  
        
    </div> 
    )
}
