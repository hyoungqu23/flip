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

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};
