import React from "react";
import { View, StyleSheet } from "react-native";
import Block from "./Block";

const GuessRow = () => (
  <View style={styles.guessRow}>
    <Block letter="A" />
    <Block letter="E" />
    <Block letter="I" />
    <Block letter="O" />
    <Block letter="" />
  </View>
);

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default GuessRow;
