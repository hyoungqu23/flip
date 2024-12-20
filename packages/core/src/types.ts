export type TDimension = `${number}${'px' | '%' | 'rem' | 'em' | 'vw' | 'vh'}` | number;
export type TColor = string;
export type TDuration = number;

export type TAnimationOption = {
  duration?: TDuration;
};

export type TCardOption = {
  width?: TDimension;
  height?: TDimension;
  fontSize?: TDimension;
  borderRadius?: TDimension;
};

export type TCenterLineOption = {
  height?: TDimension;
  backgroundColor?: TColor;
};

export type TNumberOption = { color?: TColor; backgroundColor?: TColor };

export type TOptions = {
  useDigit?: boolean;
  animation?: TAnimationOption;
  style?: {
    card?: TCardOption;
    centerLine?: TCenterLineOption;
    number?: TNumberOption;
  };
};

export type TDirection = 'up' | 'down';

export type TValueWithDigit = { digit: number; value: number };
