import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';
import 'bootstrap'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';


function App() {
  const {token,login,logout,message2,setUsersList,Create,userId, UsersListToSave,setUsersListToSave,users,getUsers,userName}=useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
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

export default App;
