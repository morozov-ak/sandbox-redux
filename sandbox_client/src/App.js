import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import  Navbar  from './components/Navbar';
import { useRoutes } from './routes';
import { connect } from 'react-redux'
import 'bootstrap'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Loader } from './components/Loader';


function App({token}) {
  const {login,logout,message2,ready,setUsersList,Create,userId, UsersListToSave,setUsersListToSave,users,getUsers,userName}=useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }
  // if (true) {
  //   return <Loader />
  // }
  

  

  return (
    <AuthContext.Provider value={{
      token, login, logout, message2,setUsersList,Create, userId, isAuthenticated, UsersListToSave,setUsersListToSave,users,getUsers,userName
    }}>
        <Router>
        {isAuthenticated&&<Navbar/>}
        
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
    
  
  );
}

const mapStateToProps = state =>{
  return {token: state.auth.token}
}

export default connect(mapStateToProps,null)(App)

//export default App;
