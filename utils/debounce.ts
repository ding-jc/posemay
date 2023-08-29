

export function debounce<T>(this: any,
  func: (...args: any[]) => T,
  delay: number = 200
): (...args: any[]) => T | void {
  let debounceTimer: any;
  const ctx = this
  if (delay === 0) {
    return func
  }
  return function (...args: any[]) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(ctx, args);
      clearTimeout(debounceTimer);
    }, delay);
  };
}

