export const geyArgs = (args) => {
  const result = {};
  const [, , ...rest] = args;

  rest.forEach((value, i, arr) => {
    if (value.charAt(0) === '-') {
      if (i === arr.length - 1) {
        result[value.substring(1)] = true;
      } else if (arr[i + 1]?.charAt(0) !== '-') {
        result[value.substring(1)] = arr[i + 1];
      } else {
        result[value.substring(1)] = true;
      }
    }
  });

  return result;
};
