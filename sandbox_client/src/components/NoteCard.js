import React, { useState, useEffect } from 'react'
//import { AuthContext } from '../context/AuthContext'
//import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { UsersShareList } from './UsersShareList'
//import { message } from '../utilites/message'
import {useDispatch} from 'react-redux'
import { saveNote, deleteNote } from '../redux/actions'
import { connect } from 'react-redux'
//import { Loader } from '../components/Loader'

const NoteCard = ({ note, allUserList,token,loading }) => {
  const history = useHistory()
  //const {  request } = useHttp()
  //const { message2 } = useContext(AuthContext)
  //const auth = useContext(AuthContext)
  //const {getUsers} = useContext(AuthContext)
  const [UsersListToSave, setUsersListToSave] = useState([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    setNoteEdit({noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext,shared:note.shared})
    console.log(note)
    if(note.length===0){console.log("BAZINGA");history.push(`/Notes`)}
    
},[note])


  const [noteEdit, setNoteEdit] = useState({
    noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext,shared:note.shared
  })

  const changeHandler = event => {
    setNoteEdit({ ...noteEdit, [event.target.name]: event.target.value })
  }


  const createHandler = async () => {
    dispatch(saveNote({newNote:{ ...noteEdit, users:UsersListToSave },token}))
    
    // try {
      
    //   message('Сохранено')
      
    //   let users = UsersListToSave
    //   console.log("users",users)
      

    //   note = await request('/api/note/save', 'POST', { ...noteEdit, users }, {
    //     authorization: `Bearer ${auth.token}`
    //   })
    //   setNoteEdit({ ...noteEdit, shared: note.shared })
    //   }
    // catch (err) { console.log(err) }
  }

  // if (loading) {
  //   return <Loader/>  
  // }

  return (
    <>
      <h1>Редактирование заметки</h1>
      <div className="input-group mb-3">
        <input onChange={changeHandler} value={noteEdit.noteNameEdit} name="noteNameEdit" id="noteNameEdit" className="form-control" />
        <div className="input-group-append">
          <button onClick={createHandler} className={loading ? "btn btn-danger":"btn btn-success"} type="button" id="button-save"  disabled={loading ? "disabled":""}>Сохранить</button>
        </div>
      </div>
      
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>

      <textarea onChange={changeHandler} value={noteEdit.noteTextEdit} name="noteTextEdit" id="noteTextEdit" className="form-control" aria-label="With textarea"></textarea>
    
      
      
      <div className="dropdown foot_btn">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Расшарить заметку
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <UsersShareList allUserList={allUserList} noteEdit={note} UsersListToSave={UsersListToSave} setUsersListToSave={setUsersListToSave} />
        </div>
      </div>

      <button type="button" className="btn btn-danger foot_btn" data-toggle="modal" data-target="#exampleModal">
        Удалить
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Удалить заметку: {note.name} ???
      </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button onClick={DeleteHandler} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button> */}
              <button onClick={()=>{dispatch(deleteNote({id:note._id,token}))}} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      

    </>
  )
}

const mapStateToProps = state => {
  return {  token: state.auth.token, allUserList: state.notes.users, note:state.notes.note,loading:state.app.loading  }
}

export default connect(mapStateToProps, null)(NoteCard)
