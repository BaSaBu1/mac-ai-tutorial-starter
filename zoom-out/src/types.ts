import type { ImageSourcePropType } from 'react-native';

export type Photo = {
  id: string;
  source: ImageSourcePropType;
  answer: string;
  aliases: string[];
  // Where to zoom in, as fractions of the image size (0.5, 0.5 is the center).
  focus: { x: number; y: number };
  credit: string;
};

export type RoundResult = {
  photo: Photo;
  solved: boolean;
  level: number; // 1-5, the zoom level when solved (or 5 if missed)
  seconds: number;
  points: number;
};
