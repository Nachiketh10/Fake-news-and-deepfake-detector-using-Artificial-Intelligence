// src/utils/TypingEffect.js

/**
 * Creates a smooth ChatGPT-style typing animation.
 * @param {string} fullText - The full text to type.
 * @param {function} setState - React state setter function.
 * @param {number} speed - Typing speed in ms per character.
 * @param {boolean} pauseAtPunctuation - Adds short pauses at punctuation marks.
 */
export const typeText = (
  fullText,
  setState,
  speed = 20,
  pauseAtPunctuation = true
) => {
  setState(""); // clear existing
  let index = 0;

  const typeNext = () => {
    if (index < fullText.length) {
      const char = fullText.charAt(index);
      setState((prev) => prev + char);
      index++;

      let delay = speed;

      // Add realistic pauses for punctuation
      if (pauseAtPunctuation && [".", ",", "!", "?"].includes(char)) {
        delay += 120;
      }

      setTimeout(typeNext, delay);
    } else {
      // ✅ Ensure full text shows at the end (fix for cutoff bug)
      setState(fullText);
    }
  };

  typeNext();
};
