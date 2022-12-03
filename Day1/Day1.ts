import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day1Data.txt"), "utf8")
  .split(/\r?\n/);

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

function solution(array: number[], numberOfHigherElements: number) {
  if (array.length < numberOfHigherElements)
    throw new Error(
      "Number of bigger elements to add should not exceed array dimension"
    );
  const arrayCopy = [...array]
  let result: number = 0;
  for (let i = 0; i < numberOfHigherElements; i++) {
    const maxIdx = findIdxMax(arrayCopy);
    result += arrayCopy[maxIdx];
    arrayCopy.splice(maxIdx, 1);
  }

  return result
}


console.log(solution(added, 1));
console.log(solution(added, 3));
