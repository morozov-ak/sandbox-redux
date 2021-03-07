import React, { useState } from 'react'
//import { AuthContext } from '../context/AuthContext'
import {useDispatch} from 'react-redux'
//import { useHttp } from '../hooks/http.hook'
import { message } from '../utilites/message'
import { connect } from 'react-redux'
import { createNote } from '../redux/actions.js'

const CreateNote = ({token,loadingg}) => {
    //const { request } = useHttp()
    const dispatch = useDispatch()
    //const auth = useContext(AuthContext)
    const [newNote, setnewNote] = useState({
        name: '', notetext: ''
    })

    const changeHandler = event => {
        setnewNote({ ...newNote, [event.target.name]: event.target.value })
    }


    const createHandler = async () => {
        try {
            dispatch(createNote({newNote,token}))
            message(`Создана новая заметка: ${newNote.name} `, newNote)
            setnewNote({ name: '', notetext: '' })
        }
        catch (e) {message(`Ошибка`) }
    }

    return (
        <div>
            <h1>Создать заметку</h1>
            <div className="input-group mb-3">
                <input onChange={changeHandler} value={newNote.name} name="name" id="name" type="text" placeholder="Заголовок заметки" className="form-control" aria-label="Amount (to the nearest dollar)" />
                <button onClick={createHandler} className={loadingg ? "btn btn-danger":"btn btn-success"} type="button" id="button-save" disabled={loadingg ? "disabled":""}>Сохранить</button>
                
            </div>
            <div className="input-group">
                <textarea onChange={changeHandler} value={newNote.notetext} name="notetext" id="notetext" className="form-control" aria-label="With textarea"></textarea>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return { token: state.auth.token,  loadingg: state.app.loading }
}

export default connect(mapStateToProps, null)(React.memo(CreateNote))