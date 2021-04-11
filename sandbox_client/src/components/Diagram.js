import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '../components/Loader'
import { NotesList } from '../components/NotesList'
import { findNotes } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { getChartData } from '../data'
const PADDING = 75


const Diagram = (props) => {
    
    return (
        <>
            

        </>
    )

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        notes: state.notes.notes,
        loading: state.app.loading,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(Diagram)