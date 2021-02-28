import React, { useEffect } from 'react'
import { Loader } from '../components/Loader'
import { AdminUsers } from '../components/AdminUsers'
import { findAdminUsers } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const AdminTools = ({ adminedUsers, token, loading }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(findAdminUsers(token))

    }, [token, dispatch])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Список пользователей</h1>
            <AdminUsers users={adminedUsers} className='table' />
        </div>
    )
}

const mapStateToProps = state => {
    return { token: state.auth.token, adminedUsers: state.notes.adminedUsers, loading: state.app.loading }
}

export default connect(mapStateToProps, null)(AdminTools)