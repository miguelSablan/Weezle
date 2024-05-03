import { compareGuessAndCorrect } from "./compareGuessAndCorrect";

export const getWordleEmoji = (word: string, guessList: string[]): string => {
  const MAX_GUESSES = 6;
  let output = `Wordle ${guessList.length}/${MAX_GUESSES}\n\n`;

  guessList.forEach((guess) => {
    let line = "";
    const styles = compareGuessAndCorrect(guess, word);

    for (let i = 0; i < guess.length; i++) {
      switch (styles[i]) {
        case "guessCorrect":
          line += "🟩"; // Green for correct letters in the correct position
          break;
        case "guessInWord":
          line += "🟨"; // Yellow for correct letters in the wrong position
          break;
        case "guessNotInWord":
          line += "⬛️"; // Gray for incorrect letters
          break;
        default:
          line += "⬛️"; // Gray for any other case
          break;
      }
    }

    output += line + "\n";
  });

  return output;
};
