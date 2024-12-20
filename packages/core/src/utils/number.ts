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

export const getConsecutiveNumber = (current: number, direction: TDirection): number => {
  if (current < 0 || current > 9) throw new Error('Invalid current Number');

  return (direction === 'up' ? current + 9 : current + 1) % 10;
};
