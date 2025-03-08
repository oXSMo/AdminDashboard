import React, { useState, useEffect, useRef } from 'react';

const CounterUp = ({ maxValue, duration = 2000, steps = 10 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const startTime = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      // Calculate the current step value
      const stepValue = Math.floor(percentage * steps);
      const currentCount = Math.floor((stepValue / steps) * maxValue);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [maxValue, duration, steps]);

  return (
    <div ref={elementRef} className="counter-up">
      {count.toLocaleString()}
    </div>
  );
};

export default CounterUp;