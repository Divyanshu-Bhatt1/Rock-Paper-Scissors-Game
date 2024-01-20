import React, { useState } from "react";
import image1 from "./svgtopng/logo.png";
import rockimg from "./svgtopng/icon-rock.png";
import scissorimg from "./svgtopng/icon-scissors.png";
import paperimg from "./svgtopng/icon-paper.png";
import Rules from "./Rules";
import Result from "./Result";
import socket from "./socketService";
import Timer from "./Timer";
import Alert from "./Alert";


const Box1=(props)=>{
  const [mark,setMark]=useState(false)

  const [alert,setAlert]=useState(null)
  const showAlert=(message)=>{
    setAlert({
     msg:message
    })

    setTimeout(()=>{
         setAlert(null)
    },1500)
}

  socket.on('userConnected', (message) => {
    
    showAlert(message)

    if(message==='A new user has connected to your room!' || message==='You have joined the room!')
    {
       setMark(true)
      
      
      
    }
  });


const [score1,updatescore1]=useState(0);
const [score2,updatescore2]=useState(0);
const txt="Opponent";

const [myChoice1,setMyChoice]=useState('');
// eslint-disable-next-line
let myChoice='';
// eslint-disable-next-line
let opponentChoice='';

const [opponentChoice1,setOpponentChoice]=useState('')
const [res_txt1,setRes_txt]=useState('')
const [toggle,setToggle]=useState(false)
const [hoGya,setHoGya]=useState(true)

const check=(myChoice,opponentChoice)=>{
      if(myChoice==='rock' && opponentChoice==='rock')
      { setHoGya(false)
        return 'Draw';
      }else if(myChoice==='rock' && opponentChoice==='scissor')
      {  setHoGya(false)
        updatescore1(score1+1);
        return 'You Win';
        
      }else if(myChoice==='rock' && opponentChoice==='paper')
      {  setHoGya(false)
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='scissor' && opponentChoice==='rock')
      {  setHoGya(false)
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='scissor' && opponentChoice==='scissor')
      {  setHoGya(false)
        return 'Draw';
      }else if(myChoice==='scissor' && opponentChoice==='paper')
      {  setHoGya(false)
        updatescore1(score1+1);
        return 'You Win';
      }else if(myChoice==='paper' && opponentChoice==='rock')
      {  setHoGya(false)
        updatescore1(score1+1);
        return 'You Win';
      }else if(myChoice==='paper' && opponentChoice==='scissor')
      {  setHoGya(false)
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='paper' && opponentChoice==='paper')
      {  setHoGya(false)
        return 'Draw';
      }else{  setHoGya(false)
        return 'Error';
      }
      
} 


const func = (event) => {

  setHoGya(true)
  let mychoice=event.currentTarget.value;
  setMyChoice(mychoice)
  props.updateMessage(mychoice)
  myChoice=mychoice;
 
};



const solve=()=>{
  let opponentchoice=props.msgReceieved;

  setTimeout(()=>{
  
    
    setOpponentChoice(opponentchoice)
    opponentChoice=opponentchoice;
  
   
  if(myChoice1!=='' &&opponentchoice!==''&&opponentchoice!==undefined ){
    
    setMark(false)
    let res=check(myChoice1,opponentchoice);
    setRes_txt(res);
  setToggle(true);
      
      setTimeout(() => {

        setToggle(false);
        props.setmyAns(false);
        props.setOppoAns(false);
        
        setMyChoice('')
        setRes_txt('')
        setMark(true)
      }, 3000);
      
    }
    },5000)
}



    return(
        <>
       
       <Alert alert={alert}/>
        <div>
        { mark&&<Timer mark={mark}/>}
        {/* <h1>{props.msgReceieved}</h1> */}
        </div>

        <div className="containers">
        <div className="Header">
          <img src={image1} alt="png" />
          <div className="score">
            <div className="score-title">My Score</div>
            <div className="score-number">{score1}</div>
            
          </div>
          <div className="score">
           <div className="score-title">{txt}</div>
            <div className="score-number">{score2}</div>
           
          </div>
        </div>
   
        {hoGya&&props.myAns && props.oppoAns?solve():null}
       {toggle && props.myAns && props.oppoAns ? ( <Result res_txt={res_txt1} choice1={myChoice1} choice2={opponentChoice1} txt={txt}/> ):(null )}
        <div className="game">
          <button className="choice" onClick={func} value="rock">
            <img src={rockimg} alt="Rock"></img>
          </button>
          <button className="choice" onClick={func} value="scissor">
            <img src={scissorimg} alt="Scissors"></img>
          </button>
          <button className="choice" onClick={func} value="paper">
            <img src={paperimg} alt="Paper"></img>
          </button>
          <Rules/>
        </div>
       
      </div>
    </>
    )
}

export default Box1;