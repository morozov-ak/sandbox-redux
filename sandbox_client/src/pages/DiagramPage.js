import React, { useEffect, useState,useCallback } from 'react'

import { connect } from 'react-redux'
import  {getChartData} from '../data'
import AsideMenu from '../components/AsideMenu'
const PADDING = 75


const DiagramPage = (props) => {
    //window.addEventListener("resize", resit);
    
    const[useWidth,setWidth]=useState(0)
    const[usePosition,setPosition]=useState(0)
    const[scale,setScale]=useState(2)
    const[resTrigger,setTrigger]=useState(true)

    //setInterval(ranData,2000)

    function minusWidth(){
        setWidth(prev=>prev-10)
    }
    function plusWidth(){
        setWidth(prev=>prev+10)
    }
    function minusPosition(){
        setPosition(prev=>prev-10)
    }
    function plusPosition(){
        setPosition(prev=>prev+10)
    }

    function resit(){
        console.log("sdf")
        setTrigger(prev=>!prev)
    }
    
    const scaleCanvas = useCallback((event) => {
        console.log("event.deltaY",event.deltaY)
        setScale(
            prev=>event.deltaY>0? prev+3:prev-3
        )
    }, [])
    
    // function scaleCanvas(event){
    //     console.log("event.deltaY",event.deltaY)
    //     setScale(
    //         prev=>event.deltaY>0? prev+3:prev-3
    //     )
    // }
    
    
    // function dragCanvas(event){
    //     console.log(event.clientX)
    //     //scale=scale+event.deltaY*0.1
    // }

    useEffect(
        () => {
            window.addEventListener("resize", resit);
            window.addEventListener("wheel", scaleCanvas);
            //window.addEventListener("mousemove", dragCanvas);
            let mdata = getChartData()
            let tmdata = [mdata.columns[1],mdata.columns[2]]
            let canvas = document.getElementById("chart")
            
            
            let CVHEIGHT = canvas.clientHeight
            let CVWIDTH = canvas.clientWidth

            canvas.height = CVHEIGHT + PADDING * scale
            canvas.width = CVWIDTH+useWidth + PADDING * scale
            
            const ctx = canvas.getContext('2d')
            
            
            
            
            tmdata.forEach(
                (line) => {
                    ctx.beginPath();
                    for(let i = 1; i< line.length;i++){
                        //console.log(line)
                        ctx.lineTo(usePosition+i*10+ PADDING, CVHEIGHT-line[i]*2 + PADDING);
                    }
                    //console.log(canvas.clientWidth)
                    ctx.strokeStyle = mdata.colors[line[0]];
                    ctx.lineWidth = 2;
                    ctx.stroke();   
                }
            )
            return (()=>{
                window.removeEventListener("resize", resit);
                window.removeEventListener("wheel", scaleCanvas);
                //window.removeEventListener("mousemove", dragCanvas);
            })
        }, [useWidth,resTrigger,usePosition,scale,scaleCanvas]
    )

    return (
        <>
        {/* <Diagram/> */}
        <div className="CanvasWrapper">
            <canvas id="chart" className="myCanvas"  {...props} />  
        </div>
        

        <div className="canvasBtn">
        
            <button className="canvasBtn." onClick={minusWidth}>-</button>
            <button className="canvasBtn2." onClick={plusWidth}>+</button>
            <button className="canvasBtn." onClick={minusPosition}>&lt;</button>
            <button className="canvasBtn2." onClick={plusPosition}>&gt;</button>
        </div>
        <AsideMenu/>
        
        </>
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

export default connect(mapStateToProps, null)(DiagramPage)