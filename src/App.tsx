import { useEffect, useState } from "react"
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key 
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler) 
    }
  }, [])

  return (
  <div style={{
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    margin: "0 auto",
    alignItems: "center",
  }}>

    <div style={{fontSize: "2rem", textAlign: "center"}}>
      <h1>Lose Win</h1>
    </div>

    <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
    <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
    <div style={{ alignSelf: "stretch"}}>
      <Keyboard/> 
    </div>
  </div>
)
}

export default App;
