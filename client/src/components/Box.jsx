import React, { useState } from "react";
import image1 from "./svgtopng/logo.png";
import rockimg from "./svgtopng/icon-rock.png";
import scissorimg from "./svgtopng/icon-scissors.png";
import paperimg from "./svgtopng/icon-paper.png";
import Rules from "./Rules";
import Result from "./Result";
const Box=()=>{
const [score1,updatescore1]=useState(0);
const [score2,updatescore2]=useState(0);
const txt="Computer";

const [myChoice1,setMyChoice]=useState('');
// eslint-disable-next-line
let myChoice='';
// eslint-disable-next-line
let computerChoice=''; 
const [computerChoice1,setComputerChoice]=useState('')
const [res_txt1,setRes_txt]=useState('')
const [toggle,setToggle]=useState(false)

const check=(myChoice,computerChoice)=>{
      if(myChoice==='rock' && computerChoice==='rock')
      {
        return 'Draw';
      }else if(myChoice==='rock' && computerChoice==='scissor')
      {
        updatescore1(score1+1);
        return 'You Win';
        
      }else if(myChoice==='rock' && computerChoice==='paper')
      {
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='scissor' && computerChoice==='rock')
      {
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='scissor' && computerChoice==='scissor')
      {
        return 'Draw';
      }else if(myChoice==='scissor' && computerChoice==='paper')
      {
        updatescore1(score1+1);
        return 'You Win';
      }else if(myChoice==='paper' && computerChoice==='rock')
      {
        updatescore1(score1+1);
        return 'You Win';
      }else if(myChoice==='paper' && computerChoice==='scissor')
      {
        updatescore2(score2+1);
        return 'You Lose';
      }else if(myChoice==='paper' && computerChoice==='paper')
      {
        return 'Draw';
      }else{
        return 'Error';
      }
} 

const randomNumber =()=>{
let rand=Math.floor((Math.random()) * 3) + 1;
 if(rand===1){
 return "rock";
}
else if(rand===2){
  return "scissor";
}
else if(rand===3){
  return "paper";
}
}

const func = (event) => {
  
  let computerchoice=randomNumber();
  setComputerChoice(computerchoice)
  computerChoice=computerchoice;
 

 let mychoice=event.currentTarget.value;
 setMyChoice(mychoice)
  myChoice=mychoice;


let res=check(mychoice,computerchoice);
// res_txt=res;
setRes_txt(res);

setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 3000);
};


    return(
        <>
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
       {toggle ? ( <Result res_txt={res_txt1} choice1={myChoice1} txt={txt} choice2={computerChoice1}/> ):(null )}
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

export default Box;