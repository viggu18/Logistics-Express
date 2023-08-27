const catchFish = (K, L, M, N, Total) => {
  const checks = [K, L, M, N];
  const missedFish = [];
  Array(Total)
    .fill(1)
    .forEach((_, index) => {
      if (!checks.some((item) => (index + 1) % item === 0)) {
        missedFish.push(index + 1);
      }
    });
  return Total - missedFish.length;
};

console.log(catchFish(1, 2, 3, 4, 12));
