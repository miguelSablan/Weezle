import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Modal,
  Clipboard,
} from "react-native";
import GuessRow from "../components/GuessRow";
import Keyboard from "../components/Keyboard";
import { useEffect, useState } from "react";
import { words } from "../data/words";
import { IGuess, defaultGuess } from "../types/guessTypes";
import { wordBank } from "../data/wordBank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWordleEmoji } from "../utils/getWordleEmoji";
import CustomButton from "../components/CustomButton";

interface GameScreenProps {
  dailyWord: string;
}

export default function GameScreen({ dailyWord }: GameScreenProps) {
  const [activeWord, setActiveWord] = useState(dailyWord);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<IGuess>(defaultGuess);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [accuracy, setAccuracy] = useState<{
    [key: string]: "correct" | "close" | "notFound";
  }>({});
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [cooldown, setCooldown] = useState(false);
  const [wordleEmoji, setWordleEmoji] = useState("");

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex];

    // Typing cooldown after submitting guess
    if (cooldown) return;

    // Prevent typing after round is over
    if (gameComplete) return;

    if (letter == "ENTER") {
      setCooldown(true);
      setTimeout(
        () => {
          setCooldown(false);
        },
        Platform.OS === "web" ? 750 : 850 // delay messes up shake animation on mobile for some reason
      );

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
        setGameMessage("You Got It!");
        const wordleScore = getWordleEmoji(
          activeWord,
          Object.values(guesses).filter(Boolean)
        );
        setWordleEmoji(wordleScore);

        // Add a delay before setting game complete
        setTimeout(() => {
          setGameComplete(true);
        }, 1000); // 1000 milliseconds = 1 second delay
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGuessIndex(guessIndex + 1);
        setGameMessage("Say it ain't so...");
        const wordleScore = getWordleEmoji(
          activeWord,
          Object.values(guesses).filter(Boolean)
        );
        setWordleEmoji(wordleScore);

        // Add a delay before setting game complete
        setTimeout(() => {
          setGameComplete(true);
        }, 1000); // 1000 milliseconds = 1 second delay
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
    // Reset game state when daily word changes
    setActiveWord(dailyWord);
    setGuessIndex(0);
    setGuesses(defaultGuess);
    setGameComplete(false);
    setAccuracy({});
    setCorrectGuesses([]);
    setWordleEmoji("");
  }, [dailyWord]);

  useEffect(() => {
    // Reset daily word at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timer = setTimeout(() => {
      // Reset daily word and update AsyncStorage or LocalStorage
      const newDailyWord =
        wordBank[Math.floor(Math.random() * wordBank.length)];
      setActiveWord(newDailyWord);
      AsyncStorage.setItem("dailyWord", newDailyWord);
    }, midnight.getTime() - Date.now());

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // reset everything
    if (!gameComplete) {
      setGuesses(defaultGuess);
      setGuessIndex(0);
      setAccuracy({});
      setCorrectGuesses([]);
      setWordleEmoji("");
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
      <Text style={styles.title}>weezle</Text>
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
              {gameMessage != "You Got It!" && (
                <Text>
                  <Text style={styles.modalText}>The word was: </Text>
                  {activeWord}
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    Clipboard.setString(wordleEmoji);
                  }}
                  title="Share"
                  buttonStyle={styles.shareButton}
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
  title: {
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
    fontSize: 25,
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
    backgroundColor: "#008FC4",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 280,
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: "#4CBB17",
  },
});
