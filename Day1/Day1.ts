import * as fs from "fs";

const Data: string[] = fs.readFileSync("Day1/Day1Data.txt", "utf8").split(/\r?\n/);

const numbers: number[] = Data.map((el) => +el);
const added: number[] = [];
numbers.reduce((first: number, second: number): number => {
  if (second === 0) {
    added.push(first);
    return 0;
  }
  return first + second;
});

function findIdxMax(array: number[]): number {
  let max: number = 0;
  let maxIdx: number = 0;

  array.map((num, idx) => {
    if (num > max) {
      max = num;
      maxIdx = idx;
    }
  });

  return maxIdx;
}

let result: number = 0;
for (let i = 0; i < 1; i++) {
    const maxIdx = findIdxMax(added)
    result += added[maxIdx]
    added.splice(maxIdx, 1)
}

console.log(result);
