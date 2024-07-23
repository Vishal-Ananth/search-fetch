 import { useEffect, useState } from "react";

export default function useDebounce(initialValue, delay) {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(initialValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  });

  return debouncedValue;
}