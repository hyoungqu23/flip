import { applyStyles, styleElementContent } from '../utils/styles';

const createStyleElement = () => {
  const style = document.createElement('style');

  style.textContent = styleElementContent;

  document.head.appendChild(style);
};

