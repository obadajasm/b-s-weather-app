export function debounce(fn, delay) {
  var timeout = null;
  return function () {
    clearTimeout(timeout);
    var args = arguments;
    var that = this;
    timeout = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}
