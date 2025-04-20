type HangmanWordProps = {
    guessedLetters: string[]
    hintLetters: string[]
    wordToGuess: string
    reveal: boolean
}

export function HangmanWord({ guessedLetters, hintLetters, wordToGuess, reveal = false }: HangmanWordProps) {
    return (
        <div 
            style={{ 
                display: "flex", 
                gap: ".25em", 
                fontSize: "6rem", 
                fontWeight: "bold", 
                textTransform: "uppercase", 
                fontFamily: "monospace" 
            }}
        >
            {wordToGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: ".1em solid black"}} key={index}>
                    <span 
                    style={{
                        visibility: guessedLetters.includes(letter) || hintLetters.includes(letter) || reveal ? "visible" : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ? "red" : 
                               hintLetters.includes(letter) ? "blue" : "black",
                    }}>
                        {letter}
                    </span>    
                </span>
            ))}
        </div>
    )
}