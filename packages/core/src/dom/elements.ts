import type { TOptions } from '../types';
import { getDigits } from '../utils/digits';
import { applyStyles, styleElementContent } from '../utils/styles';

export const createCardElements = (
  container: HTMLElement,
  value: number,
  isFirst: boolean,
  options?: TOptions,
) => {
  if (!container || !(container instanceof HTMLElement)) {
    throw new Error('Invalid Container Element.');
  }

  const digits = getDigits(value);

  for (const currentDigit of digits) {
    const { digit } = currentDigit;

    const ul = document.querySelector<HTMLUListElement>(`ul.flip[data-digit="${digit}"]`);

    if (!ul) {
      const newUl = document.createElement('ul');
      newUl.classList.add('flip');
      newUl.dataset.digit = String(digit);

      const fragment = document.createDocumentFragment();
      for (let i = 9; i >= 0; i--) {
        const li = document.createElement('li');
        li.classList.add('flip', 'card');
        li.dataset.number = String(i);

        li.innerHTML = `
          <div class="flip upper">
            <span class="flip number">${i}</span>
          </div>
          <div class="flip lower">
            <span class="flip number">${i}</span>
          </div>
        `;
        fragment.appendChild(li);
      }
      newUl.appendChild(fragment);

      if (isFirst) {
        container.append(newUl);
      } else {
        container.prepend(newUl);
      }
    }
  }

  if (isFirst) {
    applyStyles(options);

    if (!document.querySelector('style.flip')) {
      createStyleElement();
    }
  }
};

const createStyleElement = () => {
  const style = document.createElement('style');
  style.classList.add('flip');

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
