export const compareGuessAndCorrect = (guess: string, correct: string) => {
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
