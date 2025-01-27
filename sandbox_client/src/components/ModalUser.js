import React from 'react'
import {useDispatch} from 'react-redux'
import {  adminDeleteUser } from '../redux/actions.js'
import { connect } from 'react-redux'



const ModalUser = ({ user,token }) => {
  const dispatch = useDispatch()
  return (
    <>
      <button onClick={(event) => { event.stopPropagation() }} type="button" className="btn btn-danger" data-toggle="modal" data-target={`#f${user._id}`}>
        Удалить
        </button>


      <div className="modal fade" id={`f${user._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"/>
                
              
            </div>
            <div className="modal-body">
              Удалить пользователя: {user.name}?
            </div>
            <div className="modal-footer">
              <button onClick={(event) => { event.stopPropagation() }} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={(event) => {event.stopPropagation(); dispatch(adminDeleteUser({token,user})) }} type="button" data-dismiss="modal" className="btn btn-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return { token: state.auth.token }
}

export default connect(mapStateToProps, null)(ModalUser)