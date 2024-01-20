import React from 'react'
import rock from "./svgtopng/icon-rock.png";
import scissor from "./svgtopng/icon-scissors.png";
import paper from "./svgtopng/icon-paper.png";
// import scissorimg from "./svgtopng/icon-scissors.png";
export default function Result(props) {

  const computeImagePath = (choice) => {
    // Your logic to determine the image path based on the choice
    if (choice === 'rock') {
      return rock;
    } else if (choice === 'scissor') {
      return scissor;
    } else if (choice === 'paper') {
      return paper;
    } else {
      // Handle the default case or invalid choice
      return '';
    }
  };

  return (
    <div className='Result'>
          <h1 className='res-h1'>{props.res_txt}</h1>
          <div className="Result-child">
            <div className="your-choice">
                     <h2 style={{textAlign:'center'}}>You Choose :</h2>
                     <div className='flex'>
                    
                     <img className='res-img' src={computeImagePath(props.choice1)} alt=''/>
                     </div>
            </div>
            <div className="oponent-choice">
                     <h2 style={{textAlign:'center'}}>{props.txt} Choose :</h2>
                     <div className='flex'>
                     <img  className='res-img' src={computeImagePath(props.choice2)} alt=''/>
                     </div>
            </div>
          </div>
          <h1 className='res-h1'>Wait 3sec please</h1>
    </div>
  )
}
