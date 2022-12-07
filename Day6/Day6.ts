import * as fs from "fs";
import path from "path";

const Data: string = fs.readFileSync(
  path.join(__dirname, "Day6Data.txt"),
  "utf8"
);

let isFound: boolean = false;
let idx: number = -1;
let skipNext: boolean = false;
let skipTwoNext: boolean = false;

while (!isFound) {
  idx++;
  if (skipNext) {
    skipNext = false;
    continue;
  }
  if (skipTwoNext) {
    skipTwoNext = false;
    skipNext = true;
    continue;
  }

  const str: string = Data.slice(idx, idx + 4);

  const howManyFirstLetter = str.match(new RegExp(`${str[0]}`, "g"))?.length;
  if (howManyFirstLetter && howManyFirstLetter > 1) continue;

  const howManySecondLetter = str.match(new RegExp(`${str[1]}`, "g"))?.length;
  if (howManySecondLetter && howManySecondLetter > 1) {
    skipNext = true;
    continue;
  }

  const howManyThirdLetter = str.match(new RegExp(`${str[2]}`, "g"))?.length;
  if (howManyThirdLetter && howManyThirdLetter > 1) {
    skipTwoNext = true;
    continue;
  }

  isFound = true;
}

const solution: number = idx +4 

console.log(solution);
