const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  const debouncedFunction = function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};

export default debounce;
