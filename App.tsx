import GameScreen from "./src/screens/GameScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { wordBank } from "./src/data/wordBank";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [fontsLoaded] = useFonts({
    WeezerFont: require("./assets/fonts/weezerfont.ttf"),
  });

  const [dailyWord, setDailyWord] = useState("");

  useEffect(() => {
    // Load daily word from AsyncStorage
    AsyncStorage.getItem("dailyWord").then((word) => {
      if (word) {
        setDailyWord(word);
      } else {
        // Select a new daily word
        const newDailyWord =
          wordBank[Math.floor(Math.random() * wordBank.length)];
        setDailyWord(newDailyWord);
        AsyncStorage.setItem("dailyWord", newDailyWord);
      }
    });
  }, []);

  if (!fontsLoaded) return undefined;

  return (
    <SafeAreaView style={styles.container}>
      <GameScreen dailyWord={dailyWord} />
      <StatusBar style="light" />
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
});
