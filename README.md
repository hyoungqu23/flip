# Flipify

![NPM Version](https://img.shields.io/npm/v/%40flipify%2Fcore)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40flipify%2Fcore)
![NPM License](https://img.shields.io/npm/l/%40flipify%2Fcore)
![NPM Downloads](https://img.shields.io/npm/d18m/%40flipify%2Fcore)
![NPM Last Update](https://img.shields.io/npm/last-update/%40flipify%2Fcore)
![NPM Type Definitions](https://img.shields.io/npm/types/%40flipify%2Fcore)

![Demo](./assets/flip.gif)

Flipify is a TypeScript library for declarative Flip animations.

## Features

- **Declarative Trigger-Based Animations**

  Flipify allows for concise and clear implementation of Flip animations declaratively. Users can create animations with a single `trigger` function.

- **Strong Type Safety with TypeScript**

  Flipify offers detailed and intuitive type definitions, making it reliable and predictable.

- **Flexible Style Customization**

  Flipify enables detailed control over style properties to meet diverse requirements while remaining easy to use with default values.

- **Responsive Design Support**

  Flipify works seamlessly across various screen sizes.

## Installation

```bash
npm install @flipify/core
```

```bash
pnpm add @flipify/core
```

```bash
yarn add @flipify/core
```

## Usages

### JavaScript

```html
<div id="flip-container"></div>
```

```javascript
import { initialize } from '@flipify/core';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('div.flip-container');

  let currentNumber = 0;
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
```

### React

```typescript
import { initialize } from '@flipify/core';
import { useEffect, useRef, useState } from 'react';

export const Flip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ReturnType<typeof initialize>['trigger'] | null>(null);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const { trigger } = initialize(container, currentNumber, { useDigit: true });

    triggerRef.current = trigger;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber((prev) => prev + 1);

      if (triggerRef.current) {
        triggerRef.current(currentNumber);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentNumber]);

  return <div ref={containerRef} />;
};
```

## Options

| **Option**                         | **Type**     | **Description**                 | **Default** | **Remarks**                                                 |
| ---------------------------------- | ------------ | ------------------------------- | ----------- | ----------------------------------------------------------- |
| `useDigit`                         | `boolean`    | Toggle digit change             | `false`     | `true`, `false`                                             |
| `animation.duration`               | `TDuration`  | Animation duration              | `500`       | In `ms`, e.g., `1000`, `500`                                |
| `style.card.width`                 | `TDimension` | Width of the card               | `300px`     | Can also use `number`, e.g., `100px`, `20%`, `10rem`, `100` |
| `style.card.height`                | `TDimension` | Height of the card              | `400px`     | Can also use `number`, e.g., `200px`, `20%`, `10rem`, `200` |
| `style.card.fontSize`              | `TDimension` | Font size of the card           | `200px`     | Can also use `number`, e.g., `20px`, `3rem`, `18`           |
| `style.card.borderRadius`          | `TDimension` | Border radius of card           | `10px`      | Can also use `number`, e.g., `10px`, `50%`, `5`             |
| `style.centerLine.height`          | `TDimension` | Height of the center line       | `10px`      | Can also use `number`, e.g., `2px`, `1rem`, `5`             |
| `style.centerLine.backgroundColor` | `TColor`     | Background color of center line | `#DDDDDD50` | E.g., `#000000`, `rgba(0, 0, 0, 0.2)`                       |
| `style.number.color`               | `TColor`     | Color of the number             | `#FFFFFF`   | E.g., `white`, `#ff5722`, `rgb(0, 0, 0)`                    |
| `style.number.backgroundColor`     | `TColor`     | Background color of number      | `#000000`   | E.g., `black`, `#eeeeee`, `rgb(255, 255, 255)`              |

## Licenses

[MIT License](./LICENSE)

Copyright (c) 2024 HyoungMin.
