import styles from './Keyboard.module.css'

const KEYS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
    "u", "v", "w", "x", "y", "z"
];

type KeyboardProps = {
    disabled: boolean
    activeLetters: string[]
    inactiveLetters: string[] 
    addGuessedLetters: (letter: string) => void
    onHint: () => void
    hintCount: number
}

export function Keyboard({ 
    activeLetters, 
    inactiveLetters, 
    disabled = false, 
    addGuessedLetters,
    onHint,
    hintCount 
}: KeyboardProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <div 
                style={{
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", 
                    gap: ".5rem"
                }}
            >
                {KEYS.map(key => {
                    const isActive = activeLetters.includes(key)
                    const isInactive = inactiveLetters.includes(key)
                    return (
                    <button 
                        onClick={() => addGuessedLetters(key)} 
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
                        disabled={isInactive || isActive || disabled} 
                        key={key}
                    >
                        {key}
                    </button>
                    ) 
                })} 
            </div>
            <button 
                onClick={onHint}
                disabled={disabled || hintCount >= 2}
                style={{
                    padding: ".5rem 1rem",
                    fontSize: "1.25rem",
                    backgroundColor: hintCount >= 2 ? "gray" : "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: hintCount >= 2 ? "not-allowed" : "pointer",
                    alignSelf: "center"
                }}
            >
                Hint ({2 - hintCount} left)
            </button>
        </div>
    )
}