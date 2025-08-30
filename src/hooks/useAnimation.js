import { useState, useEffect } from 'react';

export function useAnimation(trigger = true, delay = 0) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timeout = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [trigger, delay]);

  return shouldAnimate;
}

export function useStaggeredAnimation(items, delay = 100) {
  const [animatedItems, setAnimatedItems] = useState(new Set());

  useEffect(() => {
    items.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedItems(prev => new Set([...prev, index]));
      }, index * delay);
    });
  }, [items, delay]);

  return animatedItems;
}