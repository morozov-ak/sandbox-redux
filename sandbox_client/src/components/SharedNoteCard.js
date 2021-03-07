import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

const SharedNotesList = ({ note }) => {
    const history = useHistory()
    
    useEffect(() => {
        setNoteEdit({ noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext, shared: note.shared })
        //console.log(note)
        if (note.length === 0) { history.push(`/Create`) }
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
