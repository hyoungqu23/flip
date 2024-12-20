import type { TDirection } from '../types';

export const getDirection = (prev: number | undefined, number: number): TDirection =>
  prev === undefined
    ? 'up'
    : number < 0
      ? number > prev
        ? 'down'
        : 'up'
      : number > prev
        ? 'up'
        : 'down';
