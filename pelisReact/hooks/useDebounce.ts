import { useRef } from "react";
export function useDebounce() {
  const debouncing = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const debounce = (callback: () => void, delay: number) => {
    clearTimeout(debouncing.current);
    debouncing.current = setTimeout(callback, delay);
  };

  return debounce;
}
