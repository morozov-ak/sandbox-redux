import React, { useState, useContext } from 'react'
//import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


export const ChangePassword = () => {
    //const history=useHistory()
    const {message2} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    
    const[form,setForm]=useState({
        oldPass:'',pass:'',ConfirmPass:''
    })
    

    

    const changeHandler = event=>{
        setForm({...form, [event.target.name]:event.target.value})
        
    }



    const loginHandler = async () => {
        
        try{
            const data = await request('/api/note/change_password','POST',{...form},{
                authorization: `Bearer ${auth.token}`
            })
            if(data.message){message2(data.message)}
            
            
            
            
        }
        catch(e){}
    }

    const switchToPass = async (target) => {
        
        const input = document.getElementById(target);
        input.focus();
        input.select();
    }

    


    


    
    return(
        
    <div className="rel">   
        <div className="auth" onSubmit={(event)=>{event.preventDefault()}}>
            <div className="SiteLogoName">Password</div>
            
            <div className="form-group">
                <label htmlFor="password">Старый пароль:</label>
                <input name="oldPass" onKeyPress={(e)=>{if(e.key==="Enter"){switchToPass("pass")}}} onChange={changeHandler} type="password" minLength="6" className="form-control" id="oldPass" placeholder="Старый пароль"/>
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Новый пароль:</label>
                <input name="pass" onKeyPress={(e)=>{if(e.key==="Enter"){switchToPass("ConfirmPass")}}} onChange={changeHandler} type="password" minLength="6" className="form-control" id="pass" placeholder="От 6 символов"/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Повторите новый пароль:</label>
                <input name="ConfirmPass" onKeyPress={(e)=>{if(e.key==="Enter"){loginHandler()}}} onChange={changeHandler} type="password" minLength="6" className="form-control" id="ConfirmPass" placeholder="От 6 символов"/>
            </div>

            <button  onClick={loginHandler} className="btn btn-primary mybtn">Сменить пароль</button>
            
            
        </div>  
        
    </div> 
    )
}
