import React, {useEffect } from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import NotesList from '../components/NotesList'
import { findNotes } from '../redux/actions.js'
import {useDispatch} from 'react-redux'
import { connect } from 'react-redux'

const NotesPage = ({notes,token}) => {
    
    const {loading,} = useHttp()
    
    const dispatch = useDispatch()
    console.log("notes:",notes)

    useEffect(() => {
        dispatch(findNotes(token))
        
      }, [])

      if (loading) {
        return <Loader/>  
      }
    
      return(
        <div>
            <h1>Заметки </h1>
            <NotesList  className='table' />
        </div>
    )
}

const mapStateToProps = state =>{
  console.log("mapStateToProps")
  return {token: state.auth.token,notes: state.notes.notes}
}

export default connect(mapStateToProps,null)(NotesPage)