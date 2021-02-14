import React from 'react'
import { Modal } from '../components/Modal'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

const NotesList = ( {notes} ) => {
  const history = useHistory()
  console.log("noteslist",notes)
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

                <tr  className='tbody'
                  onClick={() => { history.push(`/detail/${note._id}`) }}
                >
                  <td className='col1'>{index + 1}</td>
                  <td className='col2'>{note.name}</td>

                  <td className='col4'>{new Date(note.date).toLocaleDateString()}</td>
                  <td className='col5'>
                    <Modal note={note} />
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

const mapStateToProps = state =>{
  console.log(state)
  return {notes: state.notes.notes,token:state.auth.token}
}

export default connect(mapStateToProps,null)(NotesList)
