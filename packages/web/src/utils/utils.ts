export const formatPrice = (price: number) => {
  // take in a price as a number and return a string with 2 decimal places and a dollar sign
  if (price === 0) {
    return "$0.00";
  }

  return `$${(price * 0.01).toFixed(2)}`;
};
