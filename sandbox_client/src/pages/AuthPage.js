import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
    const history=useHistory()
    const auth = useContext(AuthContext)
    const {message2} = useContext(AuthContext)
    const {request} = useHttp()
    const[form,setForm]=useState({
        email:'',password:'',name:''
    })
    

    

    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
    }



    const loginHandler = async () => {
        
        try{
            const data = await request('/api/auth/login','POST',{...form})
            if(data.message){message2(data.message)}
            
            auth.login(data.token, data.userId,data.userName)
            
            
        }
        catch(e){}
    }

    const switchToPass = async () => {
        
        const input = document.getElementById('password');
        input.focus();
        input.select();
    }

    const sendMail = async () => {
        try {
            await request('/api/auth/send', 'POST', { ...form })
            message2(`Отправлен пароль для: ${form.email} `)
            

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
                <input name="password" onKeyPress={(e)=>{if(e.key==="Enter"){loginHandler()}}} onChange={changeHandler} type="password" className="form-control" id="password" placeholder="От 6 символов"/>
            </div>
            <div className="auth-buttons">
                <button  onClick={loginHandler} className="btn btn-primary mybtn">Войти</button>
                <button  onClick={()=>{history.push('/RegistrationPage')}} className="btn btn-success mybtn">Зарегистрироваться</button>
                <button  onClick={sendMail} className="btn btn-warning mybtn">Забыл пароль</button>
            </div>
            
        </div>  
        
    </div> 
    )
}
