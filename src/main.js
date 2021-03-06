/** @module calArabic */
import { Writing, Mapper } from 'aramaic-mapper';
import {
  allConsonants as calConsonants,
  vowels as calVowels,
  diacritics as calDiacritics,
  punctuation as calPunctuation,
  isDotted as isCalDotted,
  isVowel,
  isBdwlPrefix
} from 'cal-code-util';
import {
  consonants as arabicConsonants,
  vowels as arabicVowels
} from 'arabic-code-util';

/**
 * @private
 * CAL source writing
 * @const
 * @type { Writing }
 */
const calWriting = new Writing(
  calConsonants,
  calVowels,
  calDiacritics,
  calPunctuation
);

const feh = '\u0641'; // ف ARABIC LETTER FEH
const seen = '\u0633'; // س ARABIC LETTER SEEN

/**
 * @private
 * Arabic destination writing
 * @const
 * @type { Writing }
 */
const arabicWriting = new Writing(
  Object.freeze(arabicConsonants.concat(feh, seen)),
  Object.freeze([
    arabicVowels[0], // a: fatha
    '', // o: callback will use superscript alef or alef maddah as needed
    arabicVowels[2], // e: triple kasra to cover `e` and `i` and `E`
    arabicVowels[2], // i
    arabicVowels[3], // u: duplicate damma to cover both `u` and `O`
    arabicVowels[2], // E
    arabicVowels[3] // O:
  ]),
  Object.freeze(['', '', '', '']),
  Object.freeze([
    '\u061B', // ؛ Arabic Semicolon - also used with Thaana and Syriac in modern text
    '\u061F', // ؟ Arabic Question Mark - also used with Thaana and Syriac in modern text
    '\u0021', // ! Exclamation Mark - regular ASCII exclamation mark
    '.',
    '-',
    ':'
  ])
);

/**
 * @private
 * Maps input character to Arabic char
 * @param { string } c input character
 * @param { Object.<string, string> } fromTo mapping dictionary
 * @returns { string } Arabic mapped char
 */
const to = (c, fromTo) => fromTo[c] || (fromTo[c] === '' ? '' : c);
const alef = '\u0627'; // ا ARABIC LETTER ALEF
const fatha = '\u064E'; //  َ Arabic fatha - Garshuni: a
const supAlef = '\u0670'; //  ٰ Arabic letter superscript alef - Garshuni: long a
const kasra = '\u0650'; //  ِ Arabic kasra - Garshuni: i
const damma = '\u064F'; //  ُ Arabic damma - Garshuni: u
const waw = '\u0648'; // و ARABIC LETTER WAW
const yeh = '\u064A'; // ي ARABIC LETTER YEH
const madda = '\u0622'; // آ ARABIC LETTER ALEF WITH MADDA ABOVE
const ghain = '\u063A'; // غ ARABIC LETTER GHAIN
const thal = '\u0630'; // ذ ARABIC LETTER THAL
const khah = '\u062E'; // خ ARABIC LETTER KHAH
const theh = '\u062B'; // ث ARABIC LETTER THEH

/**
 * @private
 * Return true Y|w+vowel is flipped a la Sedra
 * @param { string } word word to test
 * @param { number } index position in word to start checking from
 * @returns { boolean } true if Y|w+vowel is flipped
 */
const isYwFlipped = (word, index) => {
  if (index < 1) {
    return false; // can't start word with a vowel
  }
  if (isVowel(word.charAt(index - 1))) {
    return false; // can't follow vowel by vowel
  }
  if (word.charAt(index - 1) === ')') {
    return index === 1 || isBdwlPrefix(word, index - 2); // initial Alap is followed by vowel
  }
  return true;
};

/**
 * @private
 * Maps input character to Arabic character
 * @param { string } c CAL input character
 * @param { Object.<string, string> } fromTo mapping dictionary
 * @param { Object } wordProps optional word settings
 * @returns { string } Arabic mapped char
 */
const mapCallback = (word, i, fromTo, wordProps) => {
  const c = word.charAt(i);
  if (!wordProps.isDotted) {
    return to(c, fromTo);
  }
  let m = '';
  const n = word.charAt(i + 1);
  switch (c) {
    case 'g':
      m = n === ',' ? ghain : to(c, fromTo);
      break;
    case 'd':
      m = n === ',' ? thal : to(c, fromTo);
      break;
    case 'k':
      m = n === ',' ? khah : to(c, fromTo);
      break;
    case 't':
      m = n === ',' ? theh : to(c, fromTo);
      break;
    case 'y':
      m =
        n === 'i' || n === 'e'
          ? isYwFlipped(word, i) ? kasra + yeh : yeh + kasra
          : to(c, fromTo);
      break;
    case 'w':
      m =
        n === 'u' || n === 'O'
          ? isYwFlipped(word, i) ? damma + waw : waw + damma
          : to(c, fromTo);
      break;
    case ')':
      m = n === 'o' ? madda : alef;
      break;
    case 'o':
      // using alef subscript to avoid introducing new alef not found in source
      m =
        word.charAt(i - 1) === ')'
          ? '' // handled already as madda
          : n === ')' ? fatha : supAlef;
      break;
    default:
      m = to(c, fromTo);
      break;
  }
  return m;
};

/**
 * Arabic Mapper
 * @const
 * @type { Mapper }
 */
export const mapper = new Mapper(calWriting, arabicWriting, mapCallback);

/**
 * Convert from CAL to Arabic
 * @static
 * @param {string} word input word in CAL code transliteration
 * @returns {string} the input word converted to Arabic Unicode
 */
export const toArabic = word => {
  const wordProp = Object.freeze(
    Object.create(null, {
      isDotted: { value: isCalDotted(word), enumerable: true }
    })
  );
  return mapper.map(word, wordProp);
};
