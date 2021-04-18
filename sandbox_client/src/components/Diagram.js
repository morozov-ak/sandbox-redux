import React from 'react'
import { connect } from 'react-redux'



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