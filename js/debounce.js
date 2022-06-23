const DELAY = 500;

function debounce(callback) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), DELAY);
  };
}

export {
  debounce
};
