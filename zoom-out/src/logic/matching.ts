import type { Photo } from '../types';

// Lowercase, keep only letters, numbers and spaces, and drop "a", "an", "the".
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !['a', 'an', 'the'].includes(word))
    .join(' ');
}

// Number of single-letter edits to turn one word into another.
export function levenshtein(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

function stripPlural(word: string): string {
  return word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word;
}

function matches(guess: string, target: string): boolean {
  if (guess === target) return true;
  if (stripPlural(guess) === stripPlural(target)) return true;
  // Allow one typo for longer words.
  return target.length >= 5 && levenshtein(guess, target) <= 1;
}

// Checks a typed guess against a photo's answer and aliases.
export function isCorrect(guess: string, photo: Photo): boolean {
  const g = normalize(guess);
  if (!g) return false;
  return [photo.answer, ...photo.aliases].some((target) => matches(g, normalize(target)));
}
