const shortenString = (str) => {
  const strArr = [...str];
  let currEle = {
    ele: "",
    count: 0,
  };
  let shrotenedStr = "";
  strArr.forEach((item, index) => {
    if (currEle.ele === item) {
      currEle = {
        ...currEle,
        count: currEle.count + 1,
      };
    } else {
      shrotenedStr = `${shrotenedStr}${currEle.count > 1 ? currEle.count : ""}${
        currEle.ele
      }`;
      currEle = {
        ele: item,
        count: 1,
      };
    }
    if (index === strArr.length - 1) {
      shrotenedStr = `${shrotenedStr}${currEle.count > 1 ? currEle.count : ""}${
        currEle.ele
      }`;
    }
  });
  return shrotenedStr;
};

const expandString = (str) => {
  let num = "";
  let realStr = "";

  for (let i = 0; i < str.length; i++) {
    const isNum = /[0-9]/g.test(str[i]);
    if (isNum) {
      num = num + str[i];
    } else {
      const convNum = parseInt(num);
      if (convNum) {
        const createEle = Array(convNum).fill(str[i]).join("");
        realStr += createEle;
        num = "";
      } else {
        realStr += str[i];
      }
    }
  }
  return realStr;
};

console.log(shortenString("AAAAAAAAAAAAAAAAAAAAAAAAAAAABWWWWWWWWWWWBB"));
console.log(expandString("28AB11W2B"));
