import React from 'react'
import { Modal } from '../components/Modal'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getEditingNote } from '../redux/actions'

export const NotesList = ( {notes,userId} ) => {
  const history = useHistory()
  const dispatch = useDispatch()
  if (!notes.length) {
    return <p className="center">Ссылок пока нет</p>
  }

  return (
    <div id='table' className='table'>
      <table>
        <thead>
          <tr>
            <td className='col1'>№</td>
            <td className='col2'>Заголовок</td>
            <td className='col4'>Дата создания</td>
            <td className='col5'></td>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => {
            return (
              <React.Fragment key={note._id}>

                {/* <tr  className='note_header'
                  onClick={() => { history.push(`/detail/${note._id}`); dispatch(getEditingNote({note})) }}
                > */}
                {/* <tr  className='note_header'
                  onClick={() => { history.push(`/Notes/${note._id}`); dispatch(getEditingNote({note})) }}
                > */}
                <tr  className='note_header'
                  onClick={() => { note.owner===userId?history.push(`/Notes/${note._id}`):history.push(`/shared_notes/${note._id}`); dispatch(getEditingNote({note})) }}
                >
                  <td className='col1'>{index + 1}</td>
                  <td className='col2'>{note.name}</td>

                  <td className='col4'>{new Date(note.date).toLocaleDateString()}</td>
                  <td className='col5'>
                    <Modal note={note} userId={userId}/>
                  </td>
                </tr>
                <tr>
                  <td className='col3' colSpan="4">{note.notetext}</td>
                </tr>
              </React.Fragment>


            )
          })}
        </tbody>
      </table>
    </div>

  )
}

