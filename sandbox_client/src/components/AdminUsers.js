import React from 'react'
//import { Modal } from '../components/Modal'
import { useHistory } from 'react-router-dom'
//import { useDispatch } from 'react-redux'
//import { getEditingNote } from '../redux/actions'
import  ModalUser from './ModalUser.js'

export const AdminUsers = ({ users }) => {
    const history = useHistory()
    //const dispatch = useDispatch()
    if (!users.length) {
        return <p className="center">Список пользователей пуст</p>
    }

    return (
    <>
        <table>
            <thead>
                <tr>
                <td className='col1'></td>
                <td className='col2'>Имя</td>
                <td className='col4'>Почта</td>
                <td className='col5'></td>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                return (
                    
    
                    <tr
                        key={user._id} 
                        className='tbody'
                        onClick={() => { history.push(`/AllNotesOf/${user._id}`) }}
                    >
                        <td className='col1'>{index + 1}</td>
                        <td className='col2'>{user.name} {user.admin&&"*admin*"}</td>
                        <td className='col4'>{user.email}</td>
                        <td className='col5'>
                        <ModalUser user={user} />
                        </td>
                    </tr>
                    
                
    
    
                )
            })}
            </tbody>
        </table>
    </>
    )
}

