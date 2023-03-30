import  React,{useState,useEffect } from 'react';
import UseWordle from '../hooks/useWordle';
import Grid from './Grid';
import KeyBoard from './KeyBoard';
import Modal from './Modal';



export default function Wordle({solution}) {

  const {currentGuess,handleKeyUp,guesses,turn,usedKeys,isCorrect}  = UseWordle(solution); 
  const [showModal,setShowModal] = useState(false);

  useEffect(()=>{
    window.addEventListener("keyup",handleKeyUp);

    if (isCorrect) {
      setTimeout(()=>setShowModal(true),2000);
      window.removeEventListener("keyup",handleKeyUp);
    }
    if (turn > 5) {
      setTimeout(()=>setShowModal(true),2000);
      window.removeEventListener("keyup",handleKeyUp);
    }
    return ()=>window.removeEventListener("keyup",handleKeyUp);
  },[handleKeyUp,isCorrect])

    
  return (
    <div>
        <Grid currentGuess ={currentGuess} guesses = {guesses} turn = {turn}/>
        <KeyBoard usedKeys={usedKeys} />
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}
