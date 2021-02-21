import React from 'react'
import {useDispatch} from 'react-redux'
import { reduxLogout } from '../redux/actions.js'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
//import {Nav} from 'react-bootstrap'


const Navbar = ({userName}) => {
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="navbar-brand" >SandBOX</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item"><NavLink to="/Notes" className="nav-link">Заметки</NavLink></li>
          <li className="nav-item"><NavLink to="/shared_notes" className="nav-link">Расшаренные заметки</NavLink></li>
          <li className="nav-item"><NavLink to="/Create" className="nav-link">Создать</NavLink></li>
          <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {userName}
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                
                  <NavLink to="/change_password" className="dropdown-item">Сменить пароль</NavLink>
                
                
                <span className="dropdown-item" onClick={()=>{dispatch(reduxLogout())}}>Выйти</span>
              </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = state =>{
  return {userName: state.auth.userName}
}

export default connect(mapStateToProps,null)(Navbar)