import React from "react";
import { View, StyleSheet } from "react-native";
import Block from "./Block";

const GuessRow = ({ guess }: { guess: string }) => {
  const letters = guess.split("");

  return (
    <View style={styles.guessRow}>
      <Block letter={letters[0]} />
      <Block letter={letters[1]} />
      <Block letter={letters[2]} />
      <Block letter={letters[3]} />
      <Block letter={letters[4]} />
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
