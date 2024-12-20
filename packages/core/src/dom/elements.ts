import { applyStyles, styleElementContent } from '../utils/styles';

const createStyleElement = () => {
  const style = document.createElement('style');

  style.textContent = styleElementContent;

  document.head.appendChild(style);
};

export const createMinusElement = (container: HTMLElement, value: number) => {
  const minus = document.querySelector('div.minus');

  if (value < 0) {
    if (!minus) {
      const minusElement = document.createElement('div');
      minusElement.classList.add('minus');
      minusElement.textContent = '-';
      container.prepend(minusElement);
    }
  } else {
    minus?.remove();
  }
};

export const setCardElementByDigit = (value: number, create: (i: number) => void) => {
  const currentDigits = getDigits(value);

  const uls = document.querySelectorAll<HTMLUListElement>('ul.flip');

  if (currentDigits.length !== uls.length) {
    if (currentDigits.length > uls.length) {
      for (let i = uls.length + 1; i <= currentDigits.length; i++) {
        create(i);
      }
    } else {
      for (let i = uls.length; i > currentDigits.length; i--) {
        const targetUl = document.querySelector<HTMLUListElement>(
          `ul.flip[data-digit="${Math.pow(10, i - 1)}"]`,
        );

        targetUl?.remove();
      }
    }
  }
};
