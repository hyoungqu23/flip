import type { TDirection } from '../types';
import { getDigits } from '../utils/digits';
import { getConsecutiveNumber } from '../utils/number';

export const applyAnimation = (value: number, direction: TDirection) => {
  const currentDigits = getDigits(value);

  for (const currentDigit of currentDigits) {
    const { digit, value } = currentDigit;

    const current = value;
    const next = getConsecutiveNumber(value, direction);

    const ul = document.querySelector<HTMLUListElement>(`ul.flip[data-digit="${digit}"`);

    if (!ul) {
      throw new Error('Not Found Container');
    }

    const lis = ul.querySelectorAll<HTMLLIElement>('li.flip.card');

    lis.forEach((card) => {
      card.classList.remove('current', 'next');
    });

    const currentLi = ul.querySelector<HTMLLIElement>(`li.card[data-number="${current}"]`);
    const nextLi = ul.querySelector<HTMLLIElement>(`li.card[data-number="${next}"]`);

    if (!currentLi || !nextLi) {
      throw new Error('Not Found Cards');
    }

    currentLi.classList.add('current');
    nextLi.classList.add('next');
  }
};
