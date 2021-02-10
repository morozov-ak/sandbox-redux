import React from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'
import { NotesPage } from './pages/NotesPage'
import { AuthPage } from './pages/AuthPage'
import { CreateNote } from './pages/CreateNote'
import { DetailPage } from './pages/DetailPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { SharedNotesPage } from './pages/SharedNotesPage'
import { ChangePassword } from './pages/ChangePassword'

export const useRoutes = isAuthenticated =>{
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/Notes" exact>
                    <NotesPage/>
                </Route>
                <Route path="/Create" exact>
                    <CreateNote/>
                </Route>
                <Route path="/shared_notes" exact>
                    <SharedNotesPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/change_password">
                    <ChangePassword />
                </Route>
                
                <Redirect to="/Create"/>
            </Switch>
        )
    }
    return(
        <Switch>
            
            <Route path="/RegistrationPage" exact>
                    <RegistrationPage/>
            </Route>
            <Route path="/">
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}