import React, { useEffect } from 'react'

import {Loader} from '../components/Loader'
import {NotesList} from '../components/NotesList'
import {useDispatch} from 'react-redux'
import { findSharedNotes } from '../redux/actions'
import { connect } from 'react-redux'

const SharedNotesPage = ({sharedNotes,token,loading}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(findSharedNotes(token))
    }, [])
    
    if (loading) {
      return <Loader/>  
    }

    return(
        <div>
            <h1>Расшаренные заметки </h1>
            <NotesList notes={sharedNotes} className='table' />
        </div>
    )

}

const mapStateToProps = state =>{
  return {token: state.auth.token,sharedNotes: state.notes.sharedNotes,loading: state.app.loading}
}

export default connect(mapStateToProps,null)(SharedNotesPage)