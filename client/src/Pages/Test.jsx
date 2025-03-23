import React, { useEffect, useRef, useState } from "react";
import Input from "../Components/common/Input";
import { useLogin } from "../Hooks/useUser";
import { useAnimatedCounter } from "../Utils/Hooks";
import { AnimatedCounter } from "react-animated-counter";
import CounterUp from "../Components/common/CounterUp";

function Test() {
  const [target, setTarget] = useState(0);
  const [direction, setdirection] = useState("up");
  const { current } = useAnimatedCounter(target);

  return (
    <section className="w-full h-full grid place-content-center">
      <AnimatedCounter value={target} color="white" fontSize="40px" />
      <CounterUp
        maxValue={target}
        direction={direction}
        duration={1000}
        steps={999}
      />
      <button
        onClick={() => setTarget(1000)}
        className="button border border-color"
      >
        +
      </button>

      <button
        onClick={() => {
          setdirection("down");
          setTarget(200);
        }}
        className="button border border-color"
      >
        -
      </button>
    </section>
  );
}

export default Test;
