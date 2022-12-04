import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day4Data.txt"), "utf8")
  .split(/\r?\n/);

const numberizedData: number[][][] = Data.map((pair: string) => {
  const splittedPair: string[] = pair.split(",");
  const splittedElfPair: number[][] = splittedPair.map((elfRange: string) => {
    const arrayElfRange: string[] = elfRange.split("-");
    return arrayElfRange.map((boundary) => +boundary);
  });
  return splittedElfPair;
});

const result = numberizedData
  .map((pair: number[][]) => {
    const isContained: boolean =
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1]);
    const numberizedIsContained: number = isContained ? 1 : 0;
    return numberizedIsContained;
  })
  .reduce((f: number, s: number) => f + s);

console.log(result);
