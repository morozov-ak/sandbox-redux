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

const NoteCard = ({ note, allUserList,token,loading,userId }) => {
  const history = useHistory()
  //const {  request } = useHttp()
  //const { message2 } = useContext(AuthContext)
  //const auth = useContext(AuthContext)
  //const {getUsers} = useContext(AuthContext)
  const [UsersListToSave, setUsersListToSave] = useState([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    setNoteEdit({noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext,shared:note.shared})
    if(note.length===0){history.push(`/Notes`)}
    

    
},[note,history])


  const [noteEdit, setNoteEdit] = useState({
    noteNameId: note._id, noteNameEdit: note.name, noteTextEdit: note.notetext,shared:note.shared
  })

  const changeHandler = event => {
    setNoteEdit({ ...noteEdit, [event.target.name]: event.target.value })
  }


  const createHandler = async () => {
    console.log("save:",UsersListToSave)
    dispatch(saveNote({newNote:{ ...noteEdit, users:UsersListToSave },token}))
    
    
  }
  const deleteHandler = async () => {
    dispatch(deleteNote({id:note._id,token}))
    .then((path)=>{history.goBack()})
  }



  return (
    <>
      <h1>Редактирование заметки</h1>
      <div className="input-group mb-3">
        <input onChange={changeHandler} value={noteEdit.noteNameEdit} name="noteNameEdit" id="noteNameEdit" className="form-control" />
        
          <button 
          onClick={createHandler} 
          className={loading ? "btn btn-danger":"btn btn-success"} 
          type="button" 
          id="button-save"  
          disabled={loading||note.owner!==userId ? "disabled":""}>
            Сохранить
          </button>
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

      <button disabled={note.owner===userId?"":"disabled"} type="button" className="btn btn-danger foot_btn" data-toggle="modal" data-target="#exampleModal">
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
              {/* <button onClick={()=>{dispatch(deleteNote({id:note._id,token}))}} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button> */}
              <button onClick={deleteHandler} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      

    </>
  )
}

const mapStateToProps = state => {
  return {  
    token: state.auth.token, 
    allUserList: state.notes.users, 
    note:state.notes.note,
    loading:state.app.loading, 
    userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(React.memo(NoteCard))
