import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BlockProps {
  index: number; // The index of the letter in the guess
  guess: string; // The current guess
  word: string; // The correct word
  guessed: boolean; // Whether the guess has been submitted
}

interface BlockStyles {
  [key: string]: any;
}

const Block = ({ index, guess, word, guessed }: BlockProps) => {
  const letter = guess[index]; // Get the current letter from the guess
  const wordLetter = word[index]; // Get the corresponding letter from the correct word

  const blockStyles: BlockStyles = { ...styles.guessSquare };
  const textStyles: any[] = [styles.guessLetter];

  const compareGuessAndCorrect = (guess: string, correct: string) => {
    const output: string[] = []; // stores the output styles
    const correctIndices = new Set<number>(); // store the indices of correct letters
    const correctLetters = new Set<string>(); // store the correct letters
    const correctLetterCounts = new Map<string, number>(); // store the counts of correct letters

    // Count the char frequency of each letter in the correct word
    for (const c of correct) {
      correctLetterCounts.set(c, (correctLetterCounts.get(c) || 0) + 1);
    }

    // Iterate over each letter in the correct word
    for (let i = 0; i < correct.length; i++) {
      if (guess[i] === correct[i]) {
        correctIndices.add(i);
        correctLetters.add(correct[i]);
        const count = correctLetterCounts.get(correct[i]);
        if (count !== undefined) {
          correctLetterCounts.set(correct[i], count - 1);
        }
      }
    }

    // Iterate over each letter in the guess
    for (let i = 0; i < guess.length; i++) {
      const g = guess[i];
      if (correct.includes(g) && !correctIndices.has(i)) {
        const count = correctLetterCounts.get(g);
        if (count !== undefined && count > 0) {
          output.push("guessInWord");
          correctLetterCounts.set(g, count - 1);
        } else {
          output.push("guessNotInWord");
        }
      } else if (correctIndices.has(i)) {
        output.push("guessCorrect");
      } else {
        output.push("guessNotInWord");
      }
    }

    // Iterate over each entry in the map of correct letter counts
    for (const [letter, count] of correctLetterCounts.entries()) {
      if (count > 0) {
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === letter && !correctIndices.has(i)) {
            output.push("guessNotInWord");
            break;
          }
        }
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
