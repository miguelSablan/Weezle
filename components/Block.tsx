import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BlockProps {
  letter: string;
}

const Block = ({ letter }: BlockProps) => (
  <View style={styles.guessSquare}>
    <Text style={styles.guessLetter}>{letter}</Text>
  </View>
);

const styles = StyleSheet.create({
  guessSquare: {
    borderColor: "#d3d6da",
    borderWidth: 2,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
  },
  guessLetter: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "WeezerFont",
  },
});

export default Block;
