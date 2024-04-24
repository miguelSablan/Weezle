import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import { useState } from "react";
import { wordBank } from "./data/wordBank";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    WeezerFont: require("./assets/fonts/weezerfont.ttf"),
  });
  const [activeWord, setActiveWord] = useState(wordBank[0]);
  const [guess, setGuess] = useState("");

  const handleKeyPress = (letter: string) => {
    if (letter == "ENTER") {
      if (guess.length < 5) {
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
    }

    if (letter == "DEL") {
      setGuess(guess.slice(0, -1));
      return;
    }

    // guess can only be 5 characters long
    if (guess.length >= 5) {
      return;
    }

    setGuess(guess + letter);
  };

  if (!fontsLoaded) return undefined;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>weezle</Text>
      <View>
        <GuessRow guess={guess} />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
        <GuessRow guess="" />
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
