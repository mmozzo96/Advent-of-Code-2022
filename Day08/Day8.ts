import * as fs from "fs";
import path from "path";

const Data: number[][] = fs
  .readFileSync(path.join(__dirname, "Day8Data.txt"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.split("").map((element) => +element));

enum directionIsVisible {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

function getVisibility(partialView: number[], tree: number): boolean {
  return partialView
    .map((otherTree: number) => otherTree < tree)
    .reduce((soFar: boolean, next: boolean) => soFar && next, true);
}

function checkIsVisible(
  data: number[][],
  position: number[],
  direction: directionIsVisible
): boolean {
  const [row, column]: number[] = position;
  const tree = data[row][column];
  let isVisible: boolean = false

  switch (direction) {
    case directionIsVisible.LEFT:
      isVisible = getVisibility(
        data[row].slice(0, column),
        tree
      );
      break;
    case directionIsVisible.RIGHT:
      isVisible = getVisibility(
        data[row].slice(column+1, data[row].length),
        tree
      );
      break;
    case directionIsVisible.TOP:
      isVisible = getVisibility(
        data.map(line=>line[column]).slice(0, row),
        tree
      );
      break;
    case directionIsVisible.BOTTOM:
      isVisible = getVisibility(
        data.map(line=>line[column]).slice(row+1, data.length),
        tree
      );
      break;
  }

  return isVisible
}

function numberOfVisibleTrees(data: number[][]): number {
  let visible: number = 0;

  lineLoop: for (let lineIdx = 0; lineIdx < data.length; lineIdx++) {
    const line: number[] = data[lineIdx];

    if (lineIdx === 0 || lineIdx === data.length - 1) {
      visible += line.length;
      continue lineLoop;
    }

    treeLoop: for (let treeIdx = 0; treeIdx < line.length; treeIdx++) {

      if (treeIdx === 0 || treeIdx === line.length - 1) {
        visible++;
        continue treeLoop;
      }

      for(const dirKey of ['TOP', 'RIGHT', 'BOTTOM', 'LEFT']) {
        const direction = directionIsVisible[dirKey as ('TOP'|'RIGHT'|'BOTTOM'|'LEFT')]
        const isVisible = checkIsVisible(data, [lineIdx, treeIdx], direction)
        if(isVisible) {
          visible++
          continue treeLoop
        }
      }
    }
    // console.log(visible)
  }

  return visible
}

const solution1: number = numberOfVisibleTrees(Data)

// console.log(Data)
console.log(solution1)
