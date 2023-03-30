import { useState } from "react"

const UseWordle = (solution) => {

    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys,setUsedKeys] = useState({});

    const formatGuess = ()=>{
        let solutionArray = [...solution];
        let formattedArray = [...currentGuess].map((l)=>{
             return {key:l , color:'grey'}
        })

        formattedArray.forEach((l,i) => {
            if (solutionArray[i] === l.key) {
                formattedArray[i].color = 'green'
                solutionArray[i] = null
            }   
        });

        formattedArray.forEach((l,i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedArray[i].color ='yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null

            }
        });
        return formattedArray;
    }

    const addNewGuesses = (formattedGuess) => { 
        if (currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses)=>{
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory)=>{
            return [...prevHistory,currentGuess];
        })
        setTurn((prevTurn)=>{
            return prevTurn + 1;
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })
        setCurrentGuess('');
    }

    const handleKeyUp = ({key}) => { 

        if (key === "Enter") {
            if (turn>5) {
                console.log('your have used all your lifes.');
                return
            }
            if (history.includes(currentGuess)) {
                console.log('you have already entered that guess');
                return
            }
            if (currentGuess.length!==5) {
                console.log('please enter the word of length five');
                return
            }
           const formated = formatGuess();
           addNewGuesses(formated);
            
        }

        if (key === "Backspace") {
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1);
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length<5) {
                setCurrentGuess((prev)=>{
                    return prev + key;
                })
            }
        }

      }

      return {turn,currentGuess,guesses,isCorrect,usedKeys,handleKeyUp}
    
}
 
export default UseWordle;