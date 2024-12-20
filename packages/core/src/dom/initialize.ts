import type { TOptions } from '../types.ts';
import { getDirection } from '../utils/number';
import { applyAnimation } from './animation';
import { createCardElements, createMinusElement, setCardElementByDigit } from './elements';

export const initialize = (container: HTMLElement, value: number, options?: TOptions) => {
  const _container = container;

  _container.classList.add('flip-container');

  let _previousValue: number | undefined;

  if (_previousValue === undefined) {
    createCardElements(_container, value, _previousValue === undefined, options);
  }

  const trigger = (value: number) => {
    const direction = getDirection(_previousValue, value);

    _previousValue = value;

    createMinusElement(_container, value);

    if (options?.useDigit) {
      setCardElementByDigit(value, (i: number) =>
        createCardElements(_container, Math.pow(10, i - 1), true, options),
      );
    }

    applyAnimation(value, direction);
  };

  return { trigger };
};
