import React from 'react'



//const PADDING = 75


const childBubble = ({position}) => {

    
    return (
        // <div className="childBubble" id="childBubble" style={{transform: `rotate(-${position}deg)`}}>
        <div className="childBubble" id="childBubble" style={{transform: `translate(${position.x/10}px,${position.y/10}px)`}}>
            child
            
        </div>


    )

}

export default childBubble