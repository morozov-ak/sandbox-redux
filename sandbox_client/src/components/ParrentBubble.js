import React, { useEffect, useState } from 'react'
import ChildBubble from './ChildBubble'


//const PADDING = 75


const ParrentBubble = (props) => {

    const[position,setPosition]=useState({x:0, y:0})
    

    function movehandler(event){
        setPosition({x:event.clientX,y:event.clientY})
        console.log(position)
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
        // <div className="ParrentBubble" id="ParrentBubble" style={{transform: `rotate(${position}deg)`}}>
        <div className="ParrentBubble" id="ParrentBubble" style={{transform: `translate(${position.x/10}px,${position.y/10}px)`}}>
            <ChildBubble position={position}/>
        </div>


    )

}



export default ParrentBubble