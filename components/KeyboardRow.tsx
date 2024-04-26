import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface KeyboardRowProps {
  letters: string[];
  onKeyPress: (letter: string) => void;
  accuracy: { [key: string]: "correct" | "close" | "notFound" };
}

const KeyboardRow = ({ letters, onKeyPress, accuracy }: KeyboardRowProps) => (
  <View style={styles.keyboardRow}>
    {letters.map((letter, index) => (
      <TouchableOpacity key={index} onPress={() => onKeyPress(letter)}>
        <Text
          style={[styles.key, accuracy[letter] && styles[accuracy[letter]]]}
        >
          {letter}
        </Text>
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
    fontSize: 16,
    fontFamily: "WeezerFont",
  },
  correct: {
    backgroundColor: "#b1d244",
  },
  close: {
    backgroundColor: "#c9b458",
  },
  notFound: {
    backgroundColor: "#787c7e",
  },
});

export default KeyboardRow;
