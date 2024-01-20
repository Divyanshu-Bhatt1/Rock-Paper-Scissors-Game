import React,{useState,useEffect} from "react"
import "./compo.css";
import Box1 from "./Box1";
import socket from "./socketService";
import Alert from "./Alert";
import muke_vali from "./svgtopng/muke_vali.jpg"



export default function Channel() {
  // const [id,setId]=useState(socket.id) 
  
  // eslint-disable-next-line
  const [id,setId]=useState('') 
  const [room,setRoom]=useState("")
  const [message,setMessage]=useState("")
  const [msgReceieved,setMsgReceieved]=useState("")
  const [toggle,setToggle]=useState(true)
  const [myAns,setmyAns]=useState(false)
  const [oppoAns,setOppoAns]=useState(false)



  const [alert,setAlert]=useState(null)
  const showAlert=(message)=>{
    setAlert({
     msg:message
    })

    setTimeout(()=>{
         setAlert(null)
    },1500)
}

  const join_room=()=>{
          if(room!=='')
          {
            socket.emit("join_room",{room:room,socketId:socket.id})
           
          }
          setToggle(false)
          
  }



 


  useEffect(() => {

    const handleConnect = () => {
      setId(socket.id); 
    };
 
    
    socket.on("connect", handleConnect);

    socket.on('youAreHost', () => {
      
      showAlert('You are the host')

      
    });

    socket.on("already_ocuup",(data)=>{
      
      showAlert(data);
      setTimeout(()=>{
        window.location.reload();
      },3000)
  })

  
    return () => {
      socket.off('youAreHost')
      socket.off("already_ocuup")
    };
  }, []); 


  const updateMessage=(data)=>{
            setMessage(data);
            setmyAns(true)
            sendMessage(data);
  }

  const sendMessage=(msg)=>{
    socket.emit("send_message",{message:msg,room})  
  }

  socket.on("receive_message", (data) => {
    if(data.message!==''&&data.message!==undefined){
     setOppoAns(true)
    const receivedMessage = data.message;
    setMsgReceieved(receivedMessage);
    }
  });


  return (
    <>

<Alert alert={alert}/>
    {toggle ? (<div className='box'>
       <div className="box-1">
            {/* <img src={"https://th.bing.com/th/id/OIP.y9ZQOxEOeVgg8RmgykwPMwHaE8?rs=1&pid=ImgDetMain"}/> */}
            {}
            <img src={muke_vali} alt="stone1"></img>
            {/* <h2>Hello user if you want to host the room then paste this id in the join room  and ask your friend to copy your id not his.</h2> */}
            {/* <h2>Your id : {id}</h2> */}
            <div className='box-2'>
                <input placeholder="Type room id or create one " className='room-inp' onChange={(event)=>{setRoom(event.target.value)}}/>
                <button className='room-btn' onClick={join_room}>Join Room</button>
            </div>
            
      </div>
    </div>) : (<Box1  myAns={myAns} setmyAns={setmyAns} oppoAns={oppoAns} setOppoAns={setOppoAns} msgReceieved={msgReceieved}  message={message} updateMessage={updateMessage}/>)}
    </>
  )
}
