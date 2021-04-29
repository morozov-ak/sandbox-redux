import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


//const PADDING = 75


const AsideMenu = (props) => {

    const[AsideMenuItemSwitch,setAsideMenuItemSwitch]=useState("")
    
    function idHandler(event) {
        //console.log("AM2:",event.target.closest("#AsideMenu"))
        if( !event.target.closest("#AsideMenu") ){
            //console.log("AM:",event.target.closest("AsideMenuButton"))
            setAsideMenuItemSwitch(null)
        }
        if(event.target.id==="AsideMenuButton"){
            //console.log(event.target.value)
            setAsideMenuItemSwitch(event.target.value)
        }

    }

    useEffect(
        ()=>{
            window.addEventListener("click", idHandler);
            //console.log("sdf")
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
                return (
                    <div className="AsideDropMenu" id="AsideDropMenu">1st</div>
                );
            case 'second':
                return (<div className="AsideDropMenu" id="AsideDropMenu">second</div>);
            case 'third':
                return (<div className="AsideDropMenu" id="AsideDropMenu">third</div>);
            case 'fourth':
                return (<div className="AsideDropMenu" id="AsideDropMenu">fourth</div>);
            default:
                return '';
        }
    }

    return (
        <div className="AsideMenu" id="AsideMenu">
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