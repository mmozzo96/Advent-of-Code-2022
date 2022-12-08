import * as fs from "fs";
import path from "path";

const Data: number[][] = fs
  .readFileSync(path.join(__dirname, "Day8Data.txt"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.split("").map((element) => +element));

enum directions {
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
  direction: directions
): boolean {
  const [row, column]: number[] = position;
  const tree = data[row][column];
  let isVisible: boolean = false;

  switch (direction) {
    case directions.LEFT:
      isVisible = getVisibility(data[row].slice(0, column), tree);
      break;
    case directions.RIGHT:
      isVisible = getVisibility(
        data[row].slice(column + 1, data[row].length),
        tree
      );
      break;
    case directions.TOP:
      isVisible = getVisibility(
        data.map((line) => line[column]).slice(0, row),
        tree
      );
      break;
    case directions.BOTTOM:
      isVisible = getVisibility(
        data.map((line) => line[column]).slice(row + 1, data.length),
        tree
      );
      break;
  }

  return isVisible;
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

      for (const dirKey of ["TOP", "RIGHT", "BOTTOM", "LEFT"]) {
        const direction =
          directions[dirKey as "TOP" | "RIGHT" | "BOTTOM" | "LEFT"];
        const isVisible = checkIsVisible(data, [lineIdx, treeIdx], direction);
        if (isVisible) {
          visible++;
          continue treeLoop;
        }
      }
    }
  }

  return visible;
}

const solution1: number = numberOfVisibleTrees(Data);

console.log(solution1);

function getScenario(partialView: number[], tree: number): number {
  for (let idx = 0; idx < partialView.length; idx++) {
    if (partialView[idx] >= tree) return idx + 1;
  }
  return partialView.length;
}

function getScenarioOneDirection(
  data: number[][],
  position: number[],
  direction: directions
): number {
  const [row, column]: number[] = position;
  const tree = data[row][column];
  let scenario: number = 0;

  switch (direction) {
    case directions.LEFT:
      scenario = getScenario(data[row].slice(0, column).reverse(), tree);
      break;
    case directions.RIGHT:
      scenario = getScenario(
        data[row].slice(column + 1, data[row].length),
        tree
      );
      break;
    case directions.TOP:
      scenario = getScenario(
        data
          .map((line) => line[column])
          .slice(0, row)
          .reverse(),
        tree
      );
      break;
    case directions.BOTTOM:
      scenario = getScenario(
        data.map((line) => line[column]).slice(row + 1, data.length),
        tree
      );
      break;
  }

  return scenario;
}

function getMoreScenic(data: number[][]) {
  let moreScenic: number = 0;
  let scenario: number = 1;

  lineLoop: for (let lineIdx = 0; lineIdx < data.length; lineIdx++) {
    const line: number[] = data[lineIdx];

    if (lineIdx === 0 || lineIdx === data.length - 1) {
      continue lineLoop;
    }

    treeLoop: for (let treeIdx = 0; treeIdx < line.length; treeIdx++) {
      if (treeIdx === 0 || treeIdx === line.length - 1) {
        continue treeLoop;
      }

      scenario = 1;

      for (const dirKey of ["TOP", "RIGHT", "BOTTOM", "LEFT"]) {
        const direction =
          directions[dirKey as "TOP" | "RIGHT" | "BOTTOM" | "LEFT"];
        scenario *= getScenarioOneDirection(
          data,
          [lineIdx, treeIdx],
          direction
        );
      }

      if (scenario > moreScenic) moreScenic = scenario;
    }
  }

  return moreScenic;
}

const solution2 = getMoreScenic(Data);

console.log(solution2);
