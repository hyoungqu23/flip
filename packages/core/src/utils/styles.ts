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
