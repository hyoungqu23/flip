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

