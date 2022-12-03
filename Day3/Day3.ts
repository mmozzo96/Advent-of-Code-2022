import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day3Data.txt"), "utf8")
  .split(/\r?\n/);

function findBadSortedItem(backpack: string): string {
  if (backpack.length % 2 !== 0)
    throw new Error("backpack should have a even number of items");

  const half: number = backpack.length / 2;
  const [firstContainer, secondContainer]: [string[], string] = [
    backpack.slice(0, half).split(""),
    backpack.slice(half, backpack.length),
  ];

  let badSortedItem: string = "";

  for (let i = 0; i < firstContainer.length; i++) {
    if (secondContainer.includes(firstContainer[i])) {
      badSortedItem = firstContainer[i];
      break;
    }
  }

  return badSortedItem;
}

function assignNumberToLetter(letter: string): number {
  if (letter.length !== 1)
    throw new Error("Letters should be strings composed by a single element");

  let letterInNumber = letter.charCodeAt(0) - 96;
  if (letterInNumber < 1) {
    letterInNumber += 58;
  }
  return letterInNumber;
}

const solution = Data.map((backpack) => findBadSortedItem(backpack))
  .map((letter) => assignNumberToLetter(letter))
  .reduce((f, s) => f + s);

console.log(solution);

// ---------- Part 2 -------------

function findBadge(
  firstBackpack: string,
  secondBackpack: string,
  thirdBackPack: string
): string {
  let badge: string = "";
  for (let i = 0; i < firstBackpack.length; i++) {
    const item = firstBackpack[i];
    if (!secondBackpack.includes(item)) continue;
    if (thirdBackPack.includes(item)) {
      badge = item;
      break;
    }
  }
  return badge;
}

let solution2: number = 0;

for (let i = 0; i < Data.length; i += 3) {
  solution2 += assignNumberToLetter(
    findBadge(Data[i], Data[i + 1], Data[i + 2])
  );
}

console.log(solution2);
