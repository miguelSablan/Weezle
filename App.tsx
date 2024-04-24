import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";
import { useState } from "react";

export default function App() {
  const [guess, setGuess] = useState("");

  const handleKeyPress = (letter: string) => {
    if (letter == "ENTER") {
      if (guess.length < 5) {
        return;
      }

      return;
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>WEEZLE</Text>
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
    fontWeight: "bold",
    letterSpacing: 3,
  },
});
