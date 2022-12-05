import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day5Data.txt"), "utf8")
  .split(/(\r?\n)+(\r?\n)/);
Data.splice(1, 2);
const [data1, data2]: string[][] = Data.map((data) => data.split(/\r?\n/));
data1.splice(-1, 1);

const data1Rows: string[][] = Array.from(
  Array((data1[0] + " ").length / 4),
  () => []
);
data1.map((str) => {
  const newString: string = str + " ";
  for (let i = 0; i < data1Rows.length; i++) {
    const chars4 = newString.slice(i * 4, (i + 1) * 4).split("");
    if (chars4[0] === "[") data1Rows[i].unshift(chars4[1]);
  }
});

function readData2(data2Line: string): number[] {
  if (data2Line.slice(0, 4) !== "move")
    throw new Error("something wrong with this data2 line");
  const [howManyString, data2LineGoOn]: string[] = data2Line
    .split("move ")[1]
    .split(" from ");
  const [fromString, toString]: string[] = data2LineGoOn.split(" to ");
  const result: number[] = [+howManyString, +fromString - 1, +toString - 1];
  return result;
}

const data1RowsPart1: string[][] = JSON.parse(JSON.stringify(data1Rows));

function data2MovesSetApplySolution1(rows: string[][], data2: string[]) {
  data2.map((data2Line: string) => {
    const [howMany, from, to]: number[] = readData2(data2Line);
    if (rows[from].length < howMany)
      throw new Error("you can move more than the cotained elements");

    const partToMove: string[] = rows[from].splice(-howMany, howMany);
    partToMove.reverse();

    rows[to].push(...partToMove);
  });

  return rows;
}

function solution(data1RowsSolved: string[][]) {
  console.log(data1RowsSolved.map((row) => row[row.length - 1]).join(""));
}

solution(data2MovesSetApplySolution1(data1RowsPart1, data2));

const data1RowsPart2: string[][] = JSON.parse(JSON.stringify(data1Rows));

function data2MovesSetApplySolution2(rows: string[][], data2: string[]) {
  data2.map((data2Line: string) => {
    const [howMany, from, to]: number[] = readData2(data2Line);
    if (rows[from].length < howMany)
      throw new Error("you can move more than the cotained elements");

    const partToMove: string[] = rows[from].splice(-howMany, howMany);

    rows[to].push(...partToMove);
  });

  return rows;
}

solution(data2MovesSetApplySolution2(data1RowsPart2, data2));
