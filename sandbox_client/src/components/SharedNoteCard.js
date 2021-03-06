import React, { useState, useEffect } from 'react'
//import { AuthContext } from '../context/AuthContext'
//import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
//import { UsersShareList } from './UsersShareList'
//import { message } from '../utilites/message'
import { useDispatch } from 'react-redux'
//import { saveNote, deleteNote } from '../redux/actions'
import { connect } from 'react-redux'
//import { Loader } from '../components/Loader'

const SharedNotesList = ({ note }) => {
    const history = useHistory()
    //const {  request } = useHttp()
    //const { message2 } = useContext(AuthContext)
    //const auth = useContext(AuthContext)
    //const {getUsers} = useContext(AuthContext)
    const [UsersListToSave, setUsersListToSave] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setNoteEdit({ noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext, shared: note.shared })
        //console.log(note)
        if (note.length === 0) { console.log("BAZINGA"); history.push(`/shared_notes`) }

    }, [note, history])


    const [noteEdit, setNoteEdit] = useState({
        noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext, shared: note.shared
    })

    return (
        <>
            <h1>Просмотр заметки</h1>
            <div className="input-group mb-3">
                <input readOnly value={noteEdit.noteNameEdit} name="noteNameEdit" id="noteNameEdit" className="form-control" />
            </div>
            <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
            <textarea readOnly value={noteEdit.noteTextEdit} name="noteTextEdit" id="noteTextEdit" className="form-control" aria-label="With textarea"></textarea>
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        allUserList: state.notes.users,
        note: state.notes.note,
        loading: state.app.loading,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(React.memo(SharedNotesList))
