import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Platform,
} from "react-native";
import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";
import { wordBank } from "./data/wordBank";
import { words } from "./data/words";
import { useFonts } from "expo-font";
import { IGuess, defaultGuess } from "./types/guessTypes";

export default function App() {
  const [fontsLoaded] = useFonts({
    WeezerFont: require("./assets/fonts/weezerfont.ttf"),
  });
  const [activeWord, setActiveWord] = useState(wordBank[0]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<IGuess>(defaultGuess);
  const [gameComplete, setGameComplete] = useState(false);
  const [accuracy, setAccuracy] = useState<{[key: string]: "correct" | "close" | "notFound"}>({});
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

  console.log(activeWord);
  console.log(guesses[guessIndex]);

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex];

    if (letter == "ENTER") {
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
          newAccuracy[guessedLetter] = "close";
        } else {
          newAccuracy[guessedLetter] = "notFound";
        }
      }

      setAccuracy(newAccuracy);

      if (guess == activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        alert("Correctly Guessed!");
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        alert("Say it ain't so. The word was " + activeWord);
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

  if (!fontsLoaded) return undefined;

  return (
    <SafeAreaView style={styles.container}>
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
      {gameComplete && (
        <View style={styles.gameCompleteWrapper}>
          <Text>
            <Text style={styles.bold}>Correct Word:</Text> {activeWord}
          </Text>
          <View>
            <Button
              title="Reset"
              onPress={() => {
                setGameComplete(false);
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008FC4",
    color: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: "#fff",
    fontSize: 40,
    letterSpacing: 3,
    fontFamily: "WeezerFont",
  },
  gameCompleteWrapper: {
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
