import React, { useEffect } from 'react'

import {Loader} from '../components/Loader'
import {NotesList} from '../components/NotesList'
import {useDispatch} from 'react-redux'
import { findSharedNotes } from '../redux/actions'
import { connect } from 'react-redux'

const SharedNotesPage = ({sharedNotes,token,loading,userId}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(findSharedNotes(token))
    }, [token,dispatch])
    
    if (loading) {
      return <Loader/>  
    }

    return(
        <div>
            <h1>Расшаренные заметки </h1>
            <NotesList notes={sharedNotes} userId={userId}  className='table' />
        </div>
    )

}

const mapStateToProps = state =>{
  return {
    token: state.auth.token,
    sharedNotes: state.notes.sharedNotes,
    loading: state.app.loading, 
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps,null)(SharedNotesPage)