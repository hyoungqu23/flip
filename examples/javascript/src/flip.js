import { initialize } from '@flipify/core';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('div.flip-container');

  console.log(container);

  container.style.width = '100vw';
  container.style.height = '100vh';

  let currentNumber = 97;
  const { trigger } = initialize(container, currentNumber, { useDigit: true });

  const interval = setInterval(() => {
    currentNumber += 1;

    if (trigger) {
      trigger(currentNumber);
    }
  }, 1000);

  window.addEventListener('unload', () => {
    clearInterval(interval);
  });
});
