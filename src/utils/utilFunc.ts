export const calculateStandardDeviation = (numbers: number[]): number => {
  const n = numbers.length;

  const mean = numbers.reduce((acc, num) => acc + num, 0) / n;

  const variance =
    numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / n;

  const standardDeviation = Math.sqrt(variance);
  return parseFloat(standardDeviation.toFixed(6));
};
