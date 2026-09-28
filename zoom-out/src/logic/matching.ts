import type { Photo } from '../types';

// Checks a typed guess against a photo. Filled in during the logic step.
export function isCorrect(guess: string, photo: Photo): boolean {
  return guess.trim().toLowerCase() === photo.answer.toLowerCase();
}
