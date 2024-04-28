import GameScreen from "./components/GameScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { wordBank } from "./data/wordBank";

export default function App() {
  const [fontsLoaded] = useFonts({
    WeezerFont: require("./assets/fonts/weezerfont.ttf"),
  });

  if (!fontsLoaded) return undefined;

  return (
    <SafeAreaView style={styles.container}>
      <GameScreen wordBank={wordBank} />
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
