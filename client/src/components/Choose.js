import React from 'react'
import "./compo.css";
import muke_vali from "./svgtopng/muke_vali.jpg"
import { Link,useLocation } from 'react-router-dom';



export default function Choose() {

    const location = useLocation();

    // Check if the current route is the root ("/") or any other specific route where Choose should be displayed
    const shouldDisplayChoose = location.pathname === '/' || location.pathname === '/specificRoute';
  
    if (!shouldDisplayChoose) {
      // If not on the specified routes, you can return null or an empty div to hide the component
      return null;
    }

  return (
    <div className='box'>
       <div className="box-1">
       {/* <img src={"https://th.bing.com/th/id/OIP.y9ZQOxEOeVgg8RmgykwPMwHaE8?w=285&h=190&c=7&r=0&o=5&dpr=1.4&pid=1.7"}/> */}
       
       <img src={muke_vali} alt="stone1"></img>
            {/* <h2>Hello user if you want to play with computer then tap on computer button and if you wanty to play with friend then tap on room button</h2> */}
            <div className='choose'>
            <Link to="/component1"><button className="choose_btn">Computer</button></Link>
            <p className='or_p'>OR</p>
            <Link to="/component2"><button className="choose_btn">Room</button></Link>
            </div>
      </div>
    </div>
  )
}
