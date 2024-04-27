import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BlockProps {
  index: number;
  guess: string;
  word: string;
  guessed: boolean;
}

interface BlockStyles {
  [key: string]: any;
}

const Block = ({ index, guess, word, guessed }: BlockProps) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles: BlockStyles = { ...styles.guessSquare };
  const textStyles: any[] = [styles.guessLetter];

  const compareGuessAndCorrect = (guess: string, correct: string) => {
    const output: string[] = [];
    const correctIndices = new Set<number>();
    const correctLetters = new Set<string>();

    for (let i = 0; i < correct.length; i++) {
      if (guess[i] === correct[i]) {
        correctIndices.add(i);
        correctLetters.add(correct[i]);
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const g = guess[i];
      if (correct.includes(g) && !correctIndices.has(i)) {
        if (!correctLetters.has(g)) {
          output.push('guessInWord');
          correctLetters.add(g);
        } else {
          output.push('guessNotInWord');
        }
      } else if (correctIndices.has(i)) {
        output.push('guessCorrect');
      } else {
        output.push('guessNotInWord');
      }
    }

    return output;
  };

  if (guessed) {
    const outputStyles = compareGuessAndCorrect(guess, word);

    if (letter === wordLetter) {
      Object.assign(blockStyles, styles.guessCorrect);
    } else {
      Object.assign(blockStyles, styles[outputStyles[index]]);
    }
  }

  return (
    <View style={blockStyles}>
      <Text style={textStyles}>{letter}</Text>
    </View>
  );
};

const styles: { [key: string]: any } = StyleSheet.create({
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
