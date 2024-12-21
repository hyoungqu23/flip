import type { TColor, TDimension, TDuration, TOptions } from '../types.ts';

const defaultStyles = {
  style: {
    card: { width: 300, height: 400, borderRadius: 10, fontSize: 200 },
    number: { color: '#FFFFFF', backgroundColor: '#000000' },
    centerLine: { height: 10, backgroundColor: '#DDDDDD50' },
  },
  animation: { duration: 500 },
};

export const styleElementContent = `
    @keyframes increase-layer {
      0% { z-index: 4; }
      100% { z-index: 4; }
    }

    @keyframes flip-upper {
      0% { transform: rotateX(0deg); }
      100% { transform: rotateX(90deg); }
    }

    @keyframes flip-lower {
      0% { transform: rotateX(90deg); }
      100% { transform: rotateX(0deg); }
    }

    @keyframes show {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes hide {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }

    .flip-container {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
    }
    
    div.minus {
      width: var(--card-width);
      height: var(--card-height);
      margin: 0;
      padding: 0;
      order: -1;
      border-radius: var(--card-border-radius);
      font-size: var(--card-font-size);
      line-height: 1;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--number-color);
      background-color: var(--number-bg-color);
    }

    ul.flip {
      position: relative;
      width: var(--card-width);
      height: var(--card-height);
      margin: 0;
      padding: 0;
      border-radius: var(--card-border-radius);
      font-size: var(--card-font-size);
      line-height: 1;
      font-weight: bold;
      color: var(--number-color);
      list-style-type: none;
    }

    ul.flip::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: var(--center-line-height);
      z-index: 5;
      background-color: var(--center-line-bg-color);
    }

    li.flip.card {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      div.flip {
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 1;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        span.number {
          position: absolute;
          left: 0;
          width: 100%;
          height: 200%;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--number-bg-color);
          border-radius: var(--card-border-radius);
        }
      }

      div.flip.upper {
        top: 0;
        transform-origin: 50% 100%;
        
        span.number {
          top: 0;
        }
      }

      div.flip.lower {
        bottom: 0;
        transform-origin: 50% 0%;
        
        span.number {
          bottom: 0;
        }
      }
    }

    li.flip.card.next {
      z-index: 3;

      div.upper {
        z-index: 2;
        animation: flip-upper var(--animation-duration) linear both;
      }

      div.upper::before {
        animation: show var(--animation-duration) linear both;
        background: linear-gradient(to top, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, 1) 100%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, 1) 100%);
      }

      div.lower::before {
        animation: show var(--animation-duration) linear both;
      }
    }

    li.flip.card.current {
      z-index: 2;
      animation: increase-layer var(--animation-duration) var(--animation-duration) linear forwards;

      div.upper::before {
        animation: hide var(--animation-duration) var(--animation-duration) linear both;
      }

      div.lower {
        z-index: 2;
        animation: flip-lower var(--animation-duration) var(--animation-duration) linear both;
      }

      div.lower::before {
        animation: hide var(--animation-duration) var(--animation-duration) linear both;
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .1) 100%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .1) 100%);
      }
    }
    `;

export const setCSSVariables = (variables: Record<string, TDimension | TColor | TDuration>) => {
  Object.entries(variables).forEach(([key, value]) => {
    let formattedValue: string;

    if (typeof value === 'string' && !isNaN(Number(value))) {
      value = Number(value);
    }

    if (typeof value === 'number') {
      if (key.includes('duration')) {
        formattedValue = `${value}ms`;
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
