import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '../components/Loader'
import { NotesList } from '../components/NotesList'
import { findNotes } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { getChartData } from '../data'
const PADDING = 75


const AsideMenu = (props) => {

    const[AsideMenuItemSwitch,setAsideMenuItemSwitch]=useState("")
    
    function idHandler(event) {
        console.log(event.target.closest("AsideMenuButton"))
        if(!event.target.closest("AsideMenuButton")){
            setAsideMenuItemSwitch(null)
        }
        if(event.target.id=="AsideMenuButton"){
            console.log(event.target.value)
            setAsideMenuItemSwitch(event.target.value)
        }

    }

    useEffect(
        ()=>{
            window.addEventListener("click", idHandler);
            console.log("sdf")
            return(
                ()=>{
                    window.removeEventListener("click", idHandler);
                }
            )
        },[AsideMenuItemSwitch]
    )

    function renderSwitch(AsideMenuItemSwitch) {
        switch (AsideMenuItemSwitch) {
            case 'first':
                return (<div className="AsideDropMenu">first</div>);
            case 'second':
                return (<div className="AsideDropMenu">second</div>);
            case 'third':
                return (<div className="AsideDropMenu">third</div>);
            case 'fourth':
                return (<div className="AsideDropMenu">fourth</div>);
            default:
                return '';
        }
    }

    return (
        <div className="AsideMenu">
            <button className="AsideMenuItem" id="AsideMenuButton" value="first" >dfgh</button>
            <button className="AsideMenuItem" id="AsideMenuButton" value="second" >dfgh</button>
            <button className="AsideMenuItem" id="AsideMenuButton" value="third" >dfgh</button>
            <button className="AsideMenuItem" id="AsideMenuButton" value="fourth" >dfg</button>
            {renderSwitch(AsideMenuItemSwitch)}
        </div>


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

export default connect(mapStateToProps, null)(AsideMenu)