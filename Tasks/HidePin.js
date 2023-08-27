const secret = {
  1: "pop",
  10: "double rip",
  100: "hide your mints",
  1000: "fall",
};

const createSecret = (num) => {
  const binary = [...num.toString(2)].reverse();
  const mySecret = [];
  binary.forEach((item, index) => {
    if (item == 0) {
    } else {
      const currBinary = item + Array(index).fill(0).join("");
      if (currBinary == 10000) {
        mySecret.reverse();
      } else {
        mySecret.push(secret[currBinary]);
      }
    }
  });
  return mySecret;
};

console.log(createSecret(14));
