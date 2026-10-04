export const ZOOM_SCALES = [8, 5, 3, 1.8, 1];
export const MAX_LEVEL = ZOOM_SCALES.length;
export const TIME_BONUS_SECONDS = 60;

// Points for one photo.
// level: 1-5, the zoom level when the player guessed right.
// Zoom level matters most (100 per level). Time breaks ties (up to 60 bonus).
export function scoreRound(level: number, seconds: number): number {
  const levelPoints = (MAX_LEVEL + 1 - level) * 100;
  const timeBonus = Math.max(0, TIME_BONUS_SECONDS - Math.floor(seconds));
  return levelPoints + timeBonus;
}

export const MAX_SCORE_PER_ROUND = scoreRound(1, 0);
