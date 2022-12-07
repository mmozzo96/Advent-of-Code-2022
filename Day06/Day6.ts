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

function getHowManyLetters(str: string, letter: string): number|undefined {
    const regex: RegExp = new RegExp(`${letter}`, "g")
    return str.match(regex)?.length
}

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

  const howManyFirstLetter = getHowManyLetters(str, str[0])
  if (howManyFirstLetter && howManyFirstLetter > 1) continue;

  const howManySecondLetter = getHowManyLetters(str, str[1])
  if (howManySecondLetter && howManySecondLetter > 1) {
    skipNext = true;
    continue;
  }

  const howManyThirdLetter = getHowManyLetters(str, str[2])
  if (howManyThirdLetter && howManyThirdLetter > 1) {
    skipTwoNext = true;
    continue;
  }

  isFound = true;
}

const solution: number = idx +4 

console.log(solution);


// --- Part 2 ---

isFound = false
idx = -1

whileLoop: while (!isFound) {
    idx++;
  
    const str: string = Data.slice(idx, idx + 14);
  
    for(let i=0;i<str.length-1;i++) {
        const howManyLetters = getHowManyLetters(str, str[i])
        if(howManyLetters && howManyLetters > 1) {
            continue whileLoop
        }
    }

    isFound = true
}

const solution2 = idx+14

console.log(solution2)
