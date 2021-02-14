import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import NotesList from '../components/NotesList'

export const SharedNotesPage = () => {
    const [notes, setnewNote] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    
    const fetchNotes = useCallback(async () => {
        try {
            
          const fetched = await request('/api/note/shared_notes', 'GET', null, { Authorization: `Bearer ${token}` })
          
          //const fetched = await fetch('/api/note/notes', { method:'GET' })
          //const data = await fetched.json()
          
          setnewNote(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        fetchNotes()
      }, [fetchNotes])

      if (loading) {
        return <Loader/>  
      }

      
      
    return(
        <div>
            <h1>Заметки </h1>
            <NotesList notes={notes} className='table' />
        </div>
        
      
    
    )
}