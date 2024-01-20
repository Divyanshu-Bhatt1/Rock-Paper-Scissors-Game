import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import socket from "./socketService";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);

  const [alert,setAlert]=useState(null)
  const showAlert=(message)=>{
    setAlert({
     msg:message
    })

    setTimeout(()=>{
         setAlert(null)
    },1500)
}

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Clear the interval if props.mark becomes false
    const checkMarkIntervalId = setInterval(() => {
      if (!props.mark) {
        clearInterval(intervalId);
        clearInterval(checkMarkIntervalId);
      }
    }, 100);

    // Clear the interval and log message after 10 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      clearInterval(checkMarkIntervalId);
      
      
      if (props.mark) {
        showAlert("user is disconnected or late");
        socket.disconnect();
        setTimeout(()=>{
          window.location.reload();
        },3000)
        
      }
      
    }, 20000);

    // Cleanup function to clear the interval and timeout when the component is unmounted or when the timeout is cleared
    return () => {
      clearInterval(intervalId);
      clearInterval(checkMarkIntervalId);
      clearTimeout(timeoutId);
    };
  }, [props.mark]);

  return (
    <>
    <Alert alert={alert}/>
    <div style={{display:'flex', justifyContent:'center', color:'white' }}>
      {props.mark && <h1>Timer: {seconds} seconds</h1>}
    </div>
    </>
  );
};

export default Timer;
