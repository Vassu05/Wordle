import { useEffect, useState } from "react";
import Grid from './Grid';
import KeyBoard from "./KeyBoard";
import './App.css'
function App() {
  const [ans,setAns] = useState('');
  const [guesses,setGuesses] = useState(Array(6).fill(null));
  const [currentGuess,setCurrentGuess] = useState('');
  const [isGameOver,setIsGameOver] = useState(false);
  const [isOver,setIsOver] = useState(false);
  const [words,setWords] = useState([]);
  function handleClick(event){
    if(isGameOver){
      return;
    }
    const letter = event.target.value.toLocaleUpperCase();
    if(letter === 'ENTER'){
      if(currentGuess.length < 5){
        return;
      }
      if(ans === currentGuess.toLocaleUpperCase()){
        setIsGameOver(true);
        setIsOver(true);
      }
      if (!words.includes(currentGuess.toLocaleLowerCase())) {
        console.log(currentGuess,ans);
        alert("Not In Wordlist");
        return;
      }
      const newGuesses = [...guesses];
      if (guesses.findIndex((val) => val == null) === 5) {
        setIsOver(true);
      }
      newGuesses[guesses.findIndex((val)=> val===null)] = currentGuess.toUpperCase();
      setGuesses(newGuesses);
      setCurrentGuess("");
    }
    else if(letter === '<<'){
      setCurrentGuess(currentGuess.slice(0,-1));
      return; 
    }
    if (currentGuess.length >= 5) {
      return;
    }
    else if((letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z')){
      setCurrentGuess(currentGuess+letter);
    }
  }
  useEffect(() => {
    const handleKey = (event) => {
      if(isGameOver){
        return;
      }
      if (event.key === "Enter") {
        if (currentGuess.length < 5) {
          return;
        }
        if (!words.includes(currentGuess.toLocaleLowerCase())) {
          alert("Not In Wordlist");
          return;
        }
        if(ans === currentGuess.toLocaleUpperCase()){
          setIsGameOver(true);
          setIsOver(true);
        }
        const newGuesses = [...guesses];
        if (guesses.findIndex((val) => val == null) === 5) {
          setIsOver(true);
        }
        newGuesses[
          guesses.findIndex((val) => val == null)
        ] = currentGuess.toUpperCase();
        setGuesses(newGuesses);
        setCurrentGuess("");
      }
      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      if (currentGuess.length >= 5) {
        return;
      }
      if (event.keyCode >= 65 && event.keyCode <= 91) {
        setCurrentGuess(currentGuess + event.key);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentGuess, guesses,words,ans,isGameOver]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await (await fetch('https://raw.githubusercontent.com/WebDevSimplified/wordle-clone/main/targetWords.json')).json();
      setAns(res[Math.floor(Math.random() * res.length)].toLocaleUpperCase());
      const resp = await (await fetch('https://raw.githubusercontent.com/WebDevSimplified/wordle-clone/main/dictionary.json')).json();
      setWords(resp);
    };
    fetchData();
  },[]);
  return (
    <div className="App">
      <h1>Wordle</h1>
      {(isOver) && (isGameOver ? <div className='floating'>Fantastic!</div> : <div className='floating'>The word was {ans}</div>)}
      <Grid guesses = {guesses} currentGuess={currentGuess} ans = {ans}/>
      <KeyBoard handleClick={handleClick} />
    </div>
  );
}



export default App;
