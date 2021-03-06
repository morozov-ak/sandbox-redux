import React, {useEffect } from 'react'
import {Loader} from '../components/Loader'
import {NotesList }from '../components/NotesList'
import { findNotes } from '../redux/actions.js'
import {useDispatch} from 'react-redux'
import { connect } from 'react-redux'

const NotesPage = ({notes,token,loading,userId}) => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(findNotes(token))
        
      }, [token,dispatch])

      if (loading) {
        return <Loader/>  
      }
    
      return(
        <div>
            <h1>Заметки </h1>
            <NotesList notes={notes} userId={userId}  className='table' />
        </div>
    )
}

const mapStateToProps = state =>{
  return {
    token: state.auth.token,
    notes: state.notes.notes,
    loading: state.app.loading, 
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps,null)(NotesPage)