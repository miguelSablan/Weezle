import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, Platform, Modal } from "react-native";
import GuessRow from "./GuessRow";
import Keyboard from "./Keyboard";
import { useEffect, useState } from "react";
import { words } from "../data/words";
import { IGuess, defaultGuess } from "../types/guessTypes";

interface GameScreenProps {
  wordBank: string[];
}

export default function GameScreen({ wordBank }: GameScreenProps) {
  const [activeWord, setActiveWord] = useState(wordBank[0]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<IGuess>(defaultGuess);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [accuracy, setAccuracy] = useState<{[key: string]: "correct" | "close" | "notFound"}>({});
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [cooldown, setCooldown] = useState(false);

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex];

    if (letter == "ENTER") {
      if (cooldown) {
        return;
      }

      setCooldown(true); 
      setTimeout(() => {
        setCooldown(false); // Reset cooldown after 1 second
      }, 1000);

      if (guess.length != 5) {
        alert("Word too short.");
        return;
      }

      // Check if guess is a valid word from the word list
      if (!wordBank.includes(guess) && !words.includes(guess)) {
        alert("Not a valid word.");
        return;
      }

      const newAccuracy = { ...accuracy };
      const wordLetters = activeWord.split("");

      for (let i = 0; i < guess.length; i++) {
        const guessedLetter = guess[i];
        const correctLetter = wordLetters[i];

        if (guessedLetter === correctLetter) {
          if (!correctGuesses.includes(guessedLetter)) {
            newAccuracy[guessedLetter] = "correct";
            setCorrectGuesses([...correctGuesses, guessedLetter]);
          } else {
            newAccuracy[guessedLetter] = "correct";
          }
        } else if (wordLetters.includes(guessedLetter)) {
          if (guess.indexOf(guessedLetter) === i) {
            newAccuracy[guessedLetter] = "close";
          }
        } else {
          newAccuracy[guessedLetter] = "notFound";
        }
      }

      setAccuracy(newAccuracy);

      if (guess == activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        setGameMessage("Correct!");
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        setGameMessage("Say it ain't so...");
      }
    }

    if (letter == "DEL") {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) });
      return;
    }

    // guess can only be 5 characters long
    if (guess.length >= 5) {
      return;
    }

    setGuesses({ ...guesses, [guessIndex]: guess + letter });
  };

  useEffect(() => {
    // reset everything
    if (!gameComplete) {
      setActiveWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
      setGuesses(defaultGuess);
      setGuessIndex(0);
      setAccuracy({});
      setCorrectGuesses([]);
    }
  }, [gameComplete]);

  useEffect(() => {
    // Enable keyboard input for web browsers
    if (Platform.OS === "web") {
      const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event;

        if (/^[A-Z]$/.test(key.toUpperCase())) {
          handleKeyPress(key.toUpperCase());
        } else if (key === "Enter") {
          handleKeyPress("ENTER");
        } else if (key === "Backspace") {
          handleKeyPress("DEL");
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyPress]);

  return (
    <>
      <Text style={styles.text}>weezle</Text>
      <View>
        <GuessRow
          guess={guesses[0]}
          word={activeWord}
          guessed={guessIndex > 0}
        />
        <GuessRow
          guess={guesses[1]}
          word={activeWord}
          guessed={guessIndex > 1}
        />
        <GuessRow
          guess={guesses[2]}
          word={activeWord}
          guessed={guessIndex > 2}
        />
        <GuessRow
          guess={guesses[3]}
          word={activeWord}
          guessed={guessIndex > 3}
        />
        <GuessRow
          guess={guesses[4]}
          word={activeWord}
          guessed={guessIndex > 4}
        />
        <GuessRow
          guess={guesses[5]}
          word={activeWord}
          guessed={guessIndex > 5}
        />
        <StatusBar style="light" />
      </View>
      <Keyboard onKeyPress={handleKeyPress} accuracy={accuracy} />
      <Modal
        visible={gameComplete}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setGameComplete(false)}
      >
        {gameComplete && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{gameMessage}</Text>
              <Text>
                <Text style={styles.modalText}>Correct Word:</Text> {activeWord}
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="New Game"
                  onPress={() => {
                    setGameComplete(false);
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 40,
    letterSpacing: 3,
    fontFamily: "WeezerFont",
  },
  modalText: {
    fontSize: 15,
    fontFamily: "WeezerFont",
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: "WeezerFont",
  },
  buttonContainer: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 70,
    borderRadius: 15,
    alignItems: "center",
  },
});
