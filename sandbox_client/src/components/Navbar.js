import React, { useContext } from 'react'
import {useDispatch} from 'react-redux'
import { reduxLogout } from '../redux/actions.js'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
//import {Nav} from 'react-bootstrap'


export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()



  // const logoutHandler = event => {
  //   event.preventDefault()
  //   auth.logout()
  //   history.push('/')
  // }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="navbar-brand" >SandBOX</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><NavLink to="/Notes" className="nav-link">Заметки</NavLink></li>
          <li className="nav-item"><NavLink to="/shared_notes" className="nav-link">Расшаренные заметки</NavLink></li>

          <li className="nav-item"><NavLink to="/Create" className="nav-link">Создать</NavLink></li>
          {/* <li className="nav-link" onClick={logoutHandler}>Выйти</li> */}
          <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {auth.userName}
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                
                  <NavLink to="/change_password" className="dropdown-item">Сменить пароль</NavLink>
                
                
                <span className="dropdown-item" onClick={()=>{dispatch(reduxLogout())}}>Выйти</span>
              </div>
          </li>
          {/* <div>
            <li className="nav-item">
              <div className="nav-link" onClick={logoutHandler}>Выйти</div>
            </li>
          </div> */}

        </ul>
      </div>
    </nav>



  )


}