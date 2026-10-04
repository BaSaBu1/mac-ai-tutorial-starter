import type { Photo } from '../types';

// The photos for a game. All images are square. See assets/photos/CREDITS.md.
export const PHOTOS: Photo[] = [
  {
    id: 'strawberry',
    source: require('../../assets/photos/strawberry.jpg'),
    answer: 'strawberry',
    aliases: [],
    focus: { x: 0.62, y: 0.55 },
    credit: 'Ivar Leidus, CC BY-SA 4.0',
  },
  {
    id: 'zebra',
    source: require('../../assets/photos/zebra.jpg'),
    answer: 'zebra',
    aliases: [],
    focus: { x: 0.38, y: 0.38 },
    credit: 'Yathin S Krishnappa, CC BY-SA 4.0',
  },
  {
    id: 'guitar',
    source: require('../../assets/photos/guitar.jpg'),
    answer: 'guitar',
    aliases: ['acoustic guitar'],
    focus: { x: 0.45, y: 0.6 },
    credit: 'Elmschrat, CC BY-SA 4.0',
  },
  {
    id: 'basketball',
    source: require('../../assets/photos/basketball.jpg'),
    answer: 'basketball',
    aliases: ['basket ball'],
    focus: { x: 0.7, y: 0.55 },
    credit: 'MrX, CC BY-SA 3.0',
  },
  {
    id: 'sunflower',
    source: require('../../assets/photos/sunflower.jpg'),
    answer: 'sunflower',
    aliases: ['sun flower'],
    focus: { x: 0.55, y: 0.4 },
    credit: 'George Chernilevsky, CC BY 4.0',
  },
];
