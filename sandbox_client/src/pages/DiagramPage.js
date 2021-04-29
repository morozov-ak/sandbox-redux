import React, { useEffect, useState,useCallback } from 'react'

import { connect } from 'react-redux'
import  {getChartData} from '../data'
import AsideMenu from '../components/AsideMenu'
const PADDING = 75


const DiagramPage = (props) => {
    //window.addEventListener("resize", resit);
    
    const[useWidth,setWidth]=useState(0)
    const[usePosition,setPosition]=useState(0)
    const[scale,setScale]=useState(10)
    const[resTrigger,setTrigger]=useState(true)

    //setInterval(ranData,2000)

    function minusWidth(){
        setWidth(prev=>prev-100)
    }
    function plusWidth(){
        setWidth(prev=>prev+100)
    }
    function minusPosition(){
        setPosition(prev=>prev-100)
    }
    function plusPosition(){
        setPosition(prev=>prev+100)
    }

    function resit(){
        console.log("sdf")
        setTrigger(prev=>!prev)
    }

    function calculateMinMax(lineArrays){
        let min = Number.MAX_SAFE_INTEGER
        let max = 0
        console.log(min,max)
        lineArrays.forEach(
            (line)=>{
                line.forEach(
                    point=>{
                        if(point<min){min=point}
                        if(point>max){max=point}
                    }
                )

            }
        )
        console.log(min,max)
        return [min,max]
    }
    
    const scaleCanvas = useCallback((event) => {
        console.log("event.deltaY",event.deltaY)
        setScale(
            prev=>{
                if(prev <= 128) {
                    return event.deltaY>0 ? prev+3 : prev-3
                }
                return event.deltaY>0 ? prev : prev-3
            }
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
            //let tmdata = [mdata.columns[1],mdata.columns[2]]
            let tmdata = mdata.columns.filter((line,index) => index)
            let minmax = calculateMinMax(tmdata)
            let currentHeight = (minmax[1] )*2
            console.log("currentHeight",currentHeight)
            let canvas = document.getElementById("chart")
            
            
            let CVHEIGHT = currentHeight//+ PADDING//canvas.clientHeight
            let CVWIDTH = canvas.clientWidth
            console.log("CVHEIGHT",CVHEIGHT)

            canvas.height = CVHEIGHT + PADDING*2 //* scale
            //console.log("высота",CVHEIGHT + PADDING , "scale",scale)
            canvas.width = (CVWIDTH+useWidth + PADDING) * scale *0.1
            
            const ctx = canvas.getContext('2d')
            
            ctx.imageSmoothingEnabled = false
            ctx.webkitImageSmoothingEnabled = false
            ctx.mozImageSmoothingEnabled = false
            console.log(ctx)
            
            ctx.beginPath();
            ctx.lineTo(PADDING * scale *0.1, CVHEIGHT + PADDING);
            ctx.lineTo(CVWIDTH * scale *0.1, CVHEIGHT + PADDING);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke(); 
            
            ctx.beginPath();
            ctx.lineTo(PADDING* scale *0.1, PADDING);
            ctx.lineTo(CVWIDTH * scale *0.1, PADDING);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            tmdata.forEach(
                (line) => {
                    ctx.beginPath();
                    for(let i = 1; i< line.length;i++){
                        //console.log(line)
                        ctx.lineTo(usePosition+(i-1)*10 + PADDING, CVHEIGHT-line[i]*2 + PADDING+minmax[0]);
                    }
                    //console.log(canvas.clientWidth)
                    ctx.strokeStyle = mdata.colors[line[0]];
                    ctx.lineWidth = 5;
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