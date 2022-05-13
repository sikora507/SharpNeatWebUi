import { useEffect, useRef, useState } from "react";

const useDeltaPercentage = function (
  newValue: number
): [number, number, (value: number) => void, () => void] {
  const [value, setNewValue] = useState(newValue);
  const prevValueRef = useRef<number>();
  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);
  const prevValue = prevValueRef.current;

  const [lastValidPercentageValue, setLastValidPercentageValue] = useState(0);

  function reset() {
    setNewValue(0);
    setLastValidPercentageValue(0);
  }

  function setValue(value: number) {
    setNewValue(value);
  }

  useEffect(() => {
    const delta = value - (prevValue ?? 0);
    if (delta > 0) {
      const fraction = (delta / value) * 100;
      setLastValidPercentageValue(100 - fraction);
    }
  });

  return [value, lastValidPercentageValue, setValue, reset];
};
export default useDeltaPercentage;
