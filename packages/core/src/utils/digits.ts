import type { TValueWithDigit } from '../types.ts';

export const getDigits = (num: number): Array<TValueWithDigit> => {
  const absNum = Math.abs(num);

  if (absNum === 0) return [{ digit: 1, value: 0 }];

  const result: Array<TValueWithDigit> = [];
  const numStr = absNum.toString();

  for (let i = 0; i < numStr.length; i++) {
    const position = numStr.length - i;
    const placeValue = Math.pow(10, position - 1);

    result.push({
      digit: placeValue,
      value: parseInt(numStr[i]!),
    });
  }

  return result;
};
