import React, {  useEffect } from 'react'
import  UsersShareListItem  from './UserShareListItem'
//import { AuthContext } from '../context/AuthContext'



// export 
const UsersShareList = ({ allUserList = [], noteEdit, UsersListToSave, setUsersListToSaveCB }) => {

    

    useEffect(() => {
        setUsersListToSaveCB(noteEdit.shared)
        
    },[noteEdit.shared, setUsersListToSaveCB])

    // const checkHandler = async (event, user) => {
    //         event.persist()
    //         if(event.target.checked===false){
    //             setUsersListToSave((prev)=>{
    //                 if(prev.indexOf(user._id)===-1){console.log("Повторный вызов");return prev}
    //                 prev.splice(prev.indexOf(user._id),1)
    //                 return [...prev]
    //             })
    //         }
    //         else{
    //             setUsersListToSave((prev)=>{
    //                 if(prev.indexOf(user._id)!==-1){console.log("Повторный вызов");return prev}
    //                 return [...prev, user._id]
    //             })
    //         }
    // }


    if (allUserList&&UsersListToSave) {

        return (

            allUserList.map((user) => {
                return (<UsersShareListItem key={user._id} user={user} UsersListToSave={UsersListToSave} setUsersListToSaveCB={setUsersListToSaveCB} />)
            })

            // allUserList.map((user) => {
            //     return (
            //         <div className="form-check" key={user._id}>
            //             <input onChange={(event) => { checkHandler(event, user) }} className="form-check-input" type="checkbox" value={user._id} id={user._id}
            //                 checked={UsersListToSave.includes(user._id)}
            //             ></input>
            //             <label className="form-check-label" htmlFor={user._id}>
            //                 {user.name}
            //             </label>
            //         </div>
            //     )
            // })
        )
    }

    return (<p>Нет юзеров</p>)


}

export default React.memo(UsersShareList);