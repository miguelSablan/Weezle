import React from "react";
import { View, StyleSheet } from "react-native";
import Block from "./Block";

interface GuessRowProps {
  guess: string;
  word: string;
  guessed: boolean;
}

const GuessRow = ({ guess, word, guessed }: GuessRowProps) => {
  const blockIndexes = [0, 1, 2, 3, 4];

  return (
    <View style={styles.guessRow}>
      {blockIndexes.map((index) => (
        <Block key={index} index={index} guess={guess} word={word} guessed={guessed} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default GuessRow;
