import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [hintLetters, setHintLetters] = useState<string[]>([])
  const [hintCount, setHintCount] = useState(0)

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter) || wordToGuess.split("").  every(letter => guessedLetters.includes(letter) || hintLetters.includes(letter)))
  const isGameOver = isLoser || isWinner

  const addGuessedLetter = useCallback((letter:string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return 
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  const getHint = useCallback(() => {
    if (hintCount >= 2 || isGameOver) return
    
    // Find letters not yet guessed or hinted
    const unrevealedLetters = wordToGuess
      .split("")
      .filter(letter => !guessedLetters.includes(letter) && !hintLetters.includes(letter))
    
    if (unrevealedLetters.length > 0) {
      const randomLetter = unrevealedLetters[
        Math.floor(Math.random() * unrevealedLetters.length)
      ]
      setHintLetters([...hintLetters, randomLetter])
      setHintCount(hintCount + 1)
    }
  }, [hintCount, hintLetters, guessedLetters, wordToGuess, isGameOver])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key 

      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler) 
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key 

      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setHintLetters([])
      setHintCount(0)
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler) 
    }
  })

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
        {isWinner && "Panalo galing mo"}
        {isLoser && "Talo ka iha"}
        {!isWinner && !isLoser && "Hulaan mo ang salita"}
        <div></div>
        {isGameOver && <span style={{fontSize: "2rem"}}>Ang salita ay: {wordToGuess}</span>}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
      <HangmanWord 
        guessedLetters={guessedLetters} 
        hintLetters={hintLetters}
        wordToGuess={wordToGuess} 
        reveal={isLoser}
      />
      <div style={{ alignSelf: "stretch"}}>
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} 
          inactiveLetters={inCorrectLetters} 
          addGuessedLetters={addGuessedLetter}
          onHint={getHint}
          hintCount={hintCount}
        /> 
      </div>
      <div style={{fontSize: "1rem", color: "gray"}}>
        {hintCount < 2 ? `Hints remaining: ${2 - hintCount}` : "No hints left"}
      </div>
    </div>
  )
}

export default App