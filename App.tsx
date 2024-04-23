import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import GuessRow from "./components/GuessRow";
import Keyboard from "./components/Keyboard";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>WEEZLE</Text>
      <View>
        <GuessRow />
        <GuessRow />
        <GuessRow />
        <GuessRow />
        <GuessRow />
        <GuessRow />
        <StatusBar style="auto" />
      </View>
      <Keyboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#189BCC",
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
