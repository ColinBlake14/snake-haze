export function fromStringToArray(str) {
  const arr = str.split('x');
  arr.forEach((val, index) => arr[index] = +val);

  return arr;
}

export function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}
