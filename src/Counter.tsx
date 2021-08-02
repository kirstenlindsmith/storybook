import React, { useState } from "react";
import Button from "./Button";
import Count from "./Count";

interface CounterProps {
  defaultCount?: number;
}

const Counter: React.FC<CounterProps> = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState<number>(defaultCount);
  function handleClick() {
    setCount((count) => count + 1);
  }
  return (
    <div>
      <Button onClick={handleClick} />
      <Count count={count} />
    </div>
  );
};

export default Counter;
