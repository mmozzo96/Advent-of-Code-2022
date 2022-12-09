import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day9Data.txt"), "utf8")
  .split(/\r?\n/);

enum directions {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

interface position {
  x: number;
  y: number;
}

interface instruction {
  direction: directions;
  value: number;
}

function readInstructions(instruction: string): instruction {
  if (!["U", "D", "L", "R"].includes(instruction[0]))
    throw new Error("wrong instruction type");

  const instr: string[] = instruction.split(" ");

  let direction: directions = directions.UP;
  switch (instr[0]) {
    case "U":
      direction = directions.UP;
      break;
    case "D":
      direction = directions.DOWN;
      break;
    case "L":
      direction = directions.LEFT;
      break;
    case "R":
      direction = directions.RIGHT;
      break;
  }

  const value: number = +instr[1];

  return { direction, value };
}

function moveHead(head: position, instruction: instruction): position[] {
  // change "head" position and return array of steps to arrive to that position
  const { direction, value } = instruction;
  let headVariableToChange: "x" | "y" = "x";
  let increaseDecrease: number = 1;

  let positionDuringMovement: position[] = [];

  switch (direction) {
    case directions.UP:
      headVariableToChange = "y";
      increaseDecrease = 1;
      break;
    case directions.DOWN:
      headVariableToChange = "y";
      increaseDecrease = -1;
      break;
    case directions.RIGHT:
      headVariableToChange = "x";
      increaseDecrease = 1;
      break;
    case directions.LEFT:
      headVariableToChange = "x";
      increaseDecrease = -1;
      break;
  }

  for (let i = 1; i <= value; i++) {
    head[headVariableToChange] += increaseDecrease * 1;
    positionDuringMovement.push({ ...head });
  }

  return positionDuringMovement;
}

function distance(x1: number, x2: number): number {
  return Math.abs(x1 - x2);
}

function moveTail(tail: position, head: position): position {
  // change "tail" position and return "tail"
  if (distance(tail.x, head.x) < 2 && distance(tail.y, head.y) < 2) return tail;

  if (distance(tail.y, head.y) === 0) {
    if (tail.x > head.x) tail.x--;
    else if (tail.x < head.x) tail.x++;
  } else if (distance(tail.x, head.x) === 0) {
    if (tail.y > head.y) tail.y--;
    else if (tail.y < head.y) tail.y++;
  } else if (tail.x < head.x && tail.y < head.y) {
    tail.x++;
    tail.y++;
  } else if (tail.x < head.x && tail.y > head.y) {
    tail.x++;
    tail.y--;
  } else if (tail.x > head.x && tail.y < head.y) {
    tail.x--;
    tail.y++;
  } else if (tail.x > head.x && tail.y > head.y) {
    tail.x--;
    tail.y--;
  }

  return tail;
}

function solution1(data: string[]) {
  let Head: position = {
    x: 0,
    y: 0,
  };
  let Tail: position = {
    x: 0,
    y: 0,
  };
  let TailPositions: any = {};

  data.forEach((instr) => {
    moveHead(Head, readInstructions(instr)).forEach(
      (headMovement: position) => {
        moveTail(Tail, headMovement);
        if (!TailPositions[Tail.x]) TailPositions[Tail.x] = [];
        if (!TailPositions[Tail.x].includes(Tail.y))
          TailPositions[Tail.x].push(Tail.y);
      }
    );
  });

  let solution: number = 0;
  Object.values(TailPositions).forEach((Yarray) => {
    solution += (<number[]>Yarray).length;
  });

  return solution;
}

console.log(solution1(Data))

function solution2(data: string[]) {
  let Head: position = {
    x: 0,
    y: 0,
  };
  let Tails: position[] = new Array(9).fill({
    x: 0,
    y: 0,
  });
  let TailPositions: any = {};

  data.forEach((instr) => {
    moveHead(Head, readInstructions(instr)).forEach(
      (headMovement: position) => {
        Tails[0] = moveTail({ ...Tails[0] }, headMovement);
        for (let tail = 1; tail < Tails.length; tail++) {
          Tails[tail] = moveTail({ ...Tails[tail] }, { ...Tails[tail - 1] });
        }
        const lastTail = Tails[Tails.length-1]
        if (!TailPositions[lastTail.x]) TailPositions[lastTail.x] = [];
        if (!TailPositions[lastTail.x].includes(lastTail.y))
          TailPositions[lastTail.x].push(lastTail.y);
      }
    );
  });

  let solution: number = 0;
  Object.values(TailPositions).forEach((Yarray) => {
    solution += (<number[]>Yarray).length;
  });

  return solution;
}

console.log(solution2(Data))
