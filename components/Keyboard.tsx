import KeyboardRow from "./KeyboardRow";
import { View, StyleSheet } from "react-native";

const Keyboard = () => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"];

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} />
      <KeyboardRow letters={row2} />
      <KeyboardRow letters={row3} />
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: { flexDirection: "column" },
});

export default Keyboard;
