import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
//import {Loader} from '../components/Loader'

import { useHistory } from 'react-router-dom'

export const Modal = ({ note }) => {
  const { request } = useHttp()
  const { message2 } = useContext(AuthContext)
  const history = useHistory()
  const auth = useContext(AuthContext)

  const DeleteHandler = async (id, event) => {
    try {
      await request('/api/note/deleteNote', 'POST', { noteNameId: id }, {
        authorization: `Bearer ${auth.token}`
      })
      message2("Удалено")


    }
    catch (err) { console.log(err) }
    history.push(`/Create`)
    history.push(`/Notes`)
  }

  return (
    <>
      <button onClick={(event) => { event.stopPropagation(); console.log(note._id) }} type="button" className="btn btn-danger" data-toggle="modal" data-target={`#f${note._id}`}>
        Удалить
        </button>


      <div className="modal fade" id={`f${note._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <button onClick={(event) => { event.stopPropagation() }} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={(event) => { event.stopPropagation(); DeleteHandler(note._id) }} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
