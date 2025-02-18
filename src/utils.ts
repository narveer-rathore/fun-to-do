/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounced = (fn: (...args: any[]) => void, delay: number) => {
  let timer: number | undefined;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}

export default {};
