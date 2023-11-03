export const formatPrice = (price: number) => {
  if (price >= 1e9) {
    return (price / 1e9).toFixed(2) + "b";
  } else if (price >= 1e6) {
    return (price / 1e6).toFixed(2) + "m";
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(2) + "k";
  } else {
    return price.toFixed(2);
  }
};
