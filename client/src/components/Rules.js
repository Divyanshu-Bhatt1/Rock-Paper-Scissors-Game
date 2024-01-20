import React,{useState} from 'react'
import "./compo.css";
import img_rule from "./svgtopng/image-rules.png"
import img_close from "./svgtopng/icon-close.png"
// import Container from './component';
export default function Rules() {

  const [toggle,setToggle]=useState(false) 


const handleClick=()=>{
  
  setToggle(!toggle);

  
}

const handleClose=()=>{
  
  setToggle(false)
}

  return (
    
        <>
        <button className="rules-btn" onClick={handleClick}>Rules</button>
        <div className='pop-up_container' style={{ visibility: toggle ? 'visible' : 'hidden' }}>
            <span className="pop-title">Rules</span>
            <img src={img_close} alt="close" className="close-btn" onClick={handleClose}/>
        <div className='pop-up'>
            <img src={img_rule} alt="" />
        </div>
      </div>
         </>
  )
}
