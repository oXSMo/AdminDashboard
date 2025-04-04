import React, { useState, useEffect, useRef } from "react";

const CounterUp = ({
  maxValue,
  duration = 2000,
  steps = 10,
  direction = "up",
}) => {
  const [count, setCount] = useState(direction === "up" ? 0 : maxValue);
  const elementRef = useRef(null);
  const startTime = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      const stepValue = Math.floor(percentage * steps);
      let currentCount;

      if (direction === "up") {
        currentCount = Math.floor((stepValue / steps) * maxValue);
      } else {
        currentCount = maxValue - Math.floor((stepValue / steps) * maxValue);
      }

      // Ensure maxValues stay within bounds
      currentCount = Math.max(0, Math.min(maxValue, currentCount));

      setCount(currentCount);

      if (percentage < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        // Set exact final value
        setCount(direction === "up" ? maxValue : 0);
      }
    };

    // Reset animation when any parameter changes
    startTime.current = null;
    setCount(direction === "up" ? 0 : maxValue);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [maxValue, duration, steps, direction]);

  return (
    <div ref={elementRef} className="counter">
      {count?.toLocaleString()}
    </div>
  );
};

export default CounterUp;
