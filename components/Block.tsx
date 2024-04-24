import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BlockProps {
  index: number;
  guess: string;
  word: string;
  guessed: boolean;
}

const Block = ({ index, guess, word, guessed }: BlockProps) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles: any[] = [styles.guessSquare];
  const textStyles: any[] = [styles.guessLetter];

  if (letter === wordLetter && guessed) {
    blockStyles.push(styles.guessCorrect);
    textStyles.push(styles.guessedLetter);
  } else if (word.includes(letter) && guessed) {
    blockStyles.push(styles.guessInWord);
    textStyles.push(styles.guessedLetter);
  } else if (guessed) {
    blockStyles.push(styles.guessNotInWord);
    textStyles.push(styles.guessedLetter);
  }

  return (
    <View style={blockStyles}>
      <Text style={textStyles}>{letter}</Text>
    </View>
  );
};

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
  guessedLetter: {
    color: "#fff",
  },
  guessCorrect: {
    backgroundColor: "#b1d244",
    borderColor: "#b1d244",
  },
  guessInWord: {
    backgroundColor: "#c9b458",
    borderColor: "#c9b458",
  },
  guessNotInWord: {
    backgroundColor: "#787c7e",
    borderColor: "#787c7e",
  },
});

export default Block;
