import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, Button } from "react-native";
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

      if (guess == activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        alert("Correctly Guessed!");
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
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
    }
  }, [gameComplete]);

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
        <StatusBar style="auto" />
      </View>
      <Keyboard onKeyPress={handleKeyPress} />
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
