const express = require("express");
const app = express();
const port = 3000;

/*
generates a random Integer between pMin and pMax
*/
function randomInteger(pMin = 1, pMax = 1_000_000_000) {
  pMin = Math.round(pMin);
  pMax = Math.round(pMax);
  if (pMax < pMin) {
    let t = pMin;
    pMin = pMax;
    pMax = t;
  }
  return Math.floor(Math.random() * (pMax + 1 - pMin) + pMin);
}

function randomEvenInteger(min, max) {
  let num = -1;
  while (num % 2 !== 0) {
    num = randomInteger(min, max);
  }
  return num;
}

let arr = [];
app.get("/initialize", (req, res) => {
  const size = randomEvenInteger(20, 100);
  arr = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(randomInteger(0, size - 1));
    }
    arr.push(row);
  }
  console.log(arr);
  res.json({ size });
});

app.get("/value", (req, res) => {
  const { rowIndex, colIndex } = req.query;
  res.json({ value: arr[rowIndex][colIndex] });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
