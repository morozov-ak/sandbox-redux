import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


//const PADDING = 75


const ParrentBubble = (props) => {

    const[position,setPosition]=useState(0)
    

    function movehandler(event){
        setPosition(event.clientX)
        console.log(event.clientX)
    }

    useEffect(
        ()=>{
            window.addEventListener("mousemove", movehandler);
            //console.log("sdf")
            return(
                ()=>{
                    window.removeEventListener("mousemove", movehandler);
                }
            )
        },[]
    )

    

    return (
        // <div className="ParrentBubble" id="ParrentBubble" style={{rotate:position+"deg"}}>
        //     dssvsv
        // </div>
        <div className="ParrentBubble" id="ParrentBubble" style={{transform: `rotate(${position}deg)`}}>
            dssvsv
        </div>


    )

}



export default ParrentBubble