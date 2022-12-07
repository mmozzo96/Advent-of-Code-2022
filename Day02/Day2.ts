import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day2Data.txt"), "utf8")
  .split(/\r?\n/);

function points(line: string): number {
  if (line.length !== 3) throw new Error("Strings should be of 3 chars");
  const [elf, me] = line.split(" ");
  let result: number = 0;
  switch (me) {
    case "X":
      result += 1;
      switch (elf) {
        case "A":
          result += 3;
          break;
        case "B":
          result += 0;
          break;
        case "C":
          result += 6;
          break;
      }
      break;
    case "Y":
      result += 2;
      switch (elf) {
        case "A":
          result += 6;
          break;
        case "B":
          result += 3;
          break;
        case "C":
          result += 0;
          break;
      }
      break;
    case "Z":
      result += 3;
      switch (elf) {
        case "A":
          result += 0;
          break;
        case "B":
          result += 6;
          break;
        case "C":
          result += 3;
          break;
      }
      break;
  }
  return result;
}

console.log(Data.map((str) => points(str)).reduce((f, s) => f + s));

function pointsPt2(line: string): number {
  if (line.length !== 3) throw new Error("Strings should be of 3 chars");
  const [elf, me] = line.split(" ");
  let result: number = 0;
  switch (me) {
    case "X":
      result += 0;
      switch (elf) {
        case "A":
          result += 3;
          break;
        case "B":
          result += 1;
          break;
        case "C":
          result += 2;
          break;
      }
      break;
    case "Y":
      result += 3;
      switch (elf) {
        case "A":
          result += 1;
          break;
        case "B":
          result += 2;
          break;
        case "C":
          result += 3;
          break;
      }
      break;
    case "Z":
      result += 6;
      switch (elf) {
        case "A":
          result += 2;
          break;
        case "B":
          result += 3;
          break;
        case "C":
          result += 1;
          break;
      }
      break;
  }
  return result;
}

console.log(Data.map((str) => pointsPt2(str)).reduce((f, s) => f + s));
