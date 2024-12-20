import type { TColor, TDimension, TDuration, TOptions } from '../types.ts';

const defaultStyles = {
  style: {
    card: { width: 300, height: 400, borderRadius: 10, fontSize: 200 },
    number: { color: '#FFFFFF', backgroundColor: '#000000' },
    centerLine: { height: 10, backgroundColor: '#DDDDDD' },
  },
  animation: { duration: 500 },
};

export const setCSSVariables = (variables: Record<string, TDimension | TColor | TDuration>) => {
  Object.entries(variables).forEach(([key, value]) => {
    let formattedValue: string;

    if (typeof value === 'string' && !isNaN(Number(value))) {
      value = Number(value);
    }

    if (typeof value === 'number') {
      if (key.includes('duration')) {
        formattedValue = `${value}s`;
      } else {
        formattedValue = `${value}px`;
      }
    } else {
      formattedValue = value;
    }

    document.documentElement.style.setProperty(key, formattedValue);
  });
};

export const applyStyles = (options?: TOptions) => {
  setCSSVariables({
    '--card-width': options?.style?.card?.width ?? defaultStyles.style.card.width,
    '--card-height': options?.style?.card?.height ?? defaultStyles.style.card.height,
    '--card-border-radius':
      options?.style?.card?.borderRadius ?? defaultStyles.style.card.borderRadius,
    '--card-font-size': options?.style?.card?.fontSize ?? defaultStyles.style.card.fontSize,
    '--number-color': options?.style?.number?.color ?? defaultStyles.style.number.color,
    '--number-bg-color':
      options?.style?.number?.backgroundColor ?? defaultStyles.style.number.backgroundColor,
    '--center-line-height':
      options?.style?.centerLine?.height ?? defaultStyles.style.centerLine.height,
    '--center-line-bg-color':
      options?.style?.centerLine?.backgroundColor ?? defaultStyles.style.centerLine.backgroundColor,
    '--animation-duration': options?.animation?.duration ?? defaultStyles.animation.duration,
  });
};
