import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface KeyboardRowProps {
  letters: string[];
  onKeyPress: (letter: string) => void;
}

const KeyboardRow = ({ letters, onKeyPress }: KeyboardRowProps) => (
  <View style={styles.keyboardRow}>
    {letters.map((letter, index) => (
      <TouchableOpacity key={index} onPress={() => onKeyPress(letter)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default KeyboardRow;
