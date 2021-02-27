import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AdminUsers } from '../components/AdminUsers'
import {NotesList }from '../components/NotesList'
import { findAdminNotes } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const AllNotesOf = ({ token, adminedNotes, loading }) => {
    const userId = useParams().id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(findAdminNotes({token,userId}))

    }, [token, dispatch])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Список заметок пользователя: {userId}</h1>
            <NotesList notes={adminedNotes}  className='table' />
        </div>
    )
}

const mapStateToProps = state => {
    return { token: state.auth.token, adminedNotes: state.notes.adminedNotes, loading: state.app.loading }
}

export default connect(mapStateToProps, null)(AllNotesOf)