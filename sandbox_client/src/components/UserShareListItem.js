import React from 'react'
//import { AuthContext } from '../context/AuthContext'



//export 
const UsersShareListItem = ({user, UsersListToSave, setUsersListToSave }) => {
    
    
    const checkHandler = async (event, user) => {
            event.persist()
            if(event.target.checked===false){
                setUsersListToSave((prev)=>{
                    if(prev.indexOf(user._id)===-1){console.log("Повторный вызов");return prev}
                    prev.splice(prev.indexOf(user._id),1)
                    return [...prev]
                })
            }
            else{
                setUsersListToSave((prev)=>{
                    if(prev.indexOf(user._id)!==-1){console.log("Повторный вызов");return prev}
                    return [...prev, user._id]
                })
            }
    }


                return (
                    
                    <div className="form-check" key={user._id}>
                        <input onChange={(event) => { checkHandler(event, user) }} className="form-check-input" type="checkbox" value={user._id} id={user._id}
                            checked={UsersListToSave.includes(user._id)}
                        ></input>
                        <label className="form-check-label" htmlFor={user._id}>
                            {user.name}
                        </label>
                    </div>
                    
                )


}



export default React.memo(UsersShareListItem);
