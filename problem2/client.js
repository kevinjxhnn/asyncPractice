const fetch = require("node-fetch");

async function fetchTwoValuesOfMatrix(size) {
  const numRow = size;
  const numCol = size;

  const resultMat = [];

  for (let i = 0; i < numRow; i++) {
    const rowArr = [];
    for (let j = 0; j < numCol; j += 2) {
      const first = fetch(
        `http://localhost:3000/value?rowIndex=${i}&colIndex=${j}`
      ).then((response) => {
        return response.json();
      });
      const second = fetch(
        `http://localhost:3000/value?rowIndex=${i}&colIndex=${j + 1}`
      ).then((response) => {
        return response.json();
      });

      const promiseArr = [first, second];

      const temp = await Promise.all(promiseArr);
      const result = temp.map((obj) => obj.value);
      rowArr.push(...result);
    }
    resultMat.push(rowArr);
  }

  console.log(resultMat);
}

async function main() {
  const response = await fetch("http://localhost:3000/initialize");
  const data = await response.json();

  const size = data.size;
  fetchTwoValuesOfMatrix(size);
}

main();
