import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import { useState } from "react";
import { wordBank } from "./data/wordBank";
import { useFonts } from "expo-font";
import { IGuess, defaultGuess } from "./types/guessTypes";

export default function App() {
  const [fontsLoaded] = useFonts({
    WeezerFont: require("./assets/fonts/weezerfont.ttf"),
  });
  const [activeWord, setActiveWord] = useState(wordBank[0]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<IGuess>(defaultGuess);
  console.log(guesses);

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex];
    console.log(guess);
    console.log(guesses);

    if (letter == "ENTER") {
      if (guess.length != 5) {
        alert("Word too short.");
        return;
      }

      if (!wordBank.includes(guess)) {
        alert("Not a valid word.");
        return;
      }

      if (guess == activeWord) {
        alert("You win!");
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        alert("You lose!");
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
});
