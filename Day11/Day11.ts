import * as fs from "fs";
import path from "path";
var cloneDeep = require('lodash.clonedeep');

const Data: string[][] = fs
  .readFileSync(path.join(__dirname, "Day11Data.txt"), "utf8")
  .split(/(\r?\n)+(\r?\n)/)
  .filter((chuncks: string, idx: number) => idx % 3 === 0)
  .map(monkey=>{
    const monkeyLines: string[] = monkey.split(/\r?\n/)
    return monkeyLines.slice(1)
  })

interface operation {
  (item: number): number;
}
interface test {
  (item: number): boolean;
}
interface toMonkey {
  (testResult: boolean): number
}

interface monkey {
  items: number[];
  operation: operation;
  test: test;
  toMonkey: toMonkey;
}

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

function readOperation(strOp: string): operation {
  const arrayOp = strOp.split(" ");
  if (arrayOp[0] !== "new" || arrayOp[1] !== "=") throw new Error();

  function operation(item: number) {
    const secondTerm = arrayOp[4] === "old" ? item : +arrayOp[4];
    return arrayOp[3] === "+" ? item + secondTerm : item * secondTerm;
  }

  return operation;
}

function readStartingMonkey(description: string[]): monkey {
  const firstRow: string = "  Starting items:";
  if (!description[0].startsWith(firstRow)) throw new Error();
  const stratingItems: number[] = description[0]
    .slice(firstRow.length)
    .split(",")
    .map((str) => +str);

  const secondRow: string = "  Operation: ";
  if (!description[1].startsWith(secondRow)) throw new Error();
  const operation: operation = readOperation(
    description[1].slice(secondRow.length)
  );

  const thirdRow: string = "  Test: divisible by ";
  if (!description[2].startsWith(thirdRow))
    throw new Error("maybe not all tests work with divisibility");
  const testNumber: number = +description[2].slice(thirdRow.length);
  const test: test = (item: number) => item % testNumber === 0;

  const fourthRow: string = "    If true: throw to monkey ";
  const fifthRow: string = "    If false: throw to monkey ";
  if (
    !(
      description[3].startsWith(fourthRow) &&
      description[4].startsWith(fifthRow)
    )
  )
    throw new Error();
  const isTrue: number = +description[3].slice(fourthRow.length)
  const isFalse: number = +description[4].slice(fifthRow.length)
  const toMonkey = (testResult: boolean) => testResult ? isTrue : isFalse
  
  const startingMonkey: monkey = {
    items: stratingItems,
    operation,
    test,
    toMonkey
  }

  return startingMonkey
}

const startingMonkeys: monkey[] = Data.map(description => readStartingMonkey(description))

function solution1(startingMonkeys: monkey[]) {
  let numberOfInspections: number[] = new Array(startingMonkeys.length).fill(0)

  async function monkeyTurn(monkeys: monkey[], idx: number) {
    let {items, operation, test, toMonkey}: monkey = monkeys[idx]
    const itemsLength: number = items.length
    numberOfInspections[idx] += itemsLength

    if(items.length<1) return

    for (let i=0;i<itemsLength;i++) {
      const item: number = <number>items.shift()
      const itemAfterInspection: number = Math.floor(operation(item)/3)
      const testResult: boolean = test(itemAfterInspection)
      const itemIsMovedTo: number = toMonkey(testResult)

      await monkeys[itemIsMovedTo].items.push(itemAfterInspection)
    }
  }

  async function doOneRound(monkeys: monkey[]): Promise<monkey[]> {
    let copyMonkeys: monkey[] = cloneDeep(monkeys)

    for(let i=0;i<copyMonkeys.length;i++) {
      await monkeyTurn(copyMonkeys, i)
    }
    return copyMonkeys
  }

  async function doNRound(numberOfRounds: number, startingMonkeys: monkey[]) {
    let finalMonkeys: monkey[] = cloneDeep(startingMonkeys)
    for(let i=0;i<numberOfRounds;i++){
      finalMonkeys = await doOneRound(finalMonkeys)
    }
  }

  async function logSolution() {
    await doNRound(20, startingMonkeys)
    const max1Idx = findIdxMax(numberOfInspections)
    const max1 = numberOfInspections[max1Idx]
    numberOfInspections.splice(max1Idx,1)
    const max2 = Math.max(...numberOfInspections)

    console.log(max1 * max2)
  }

  logSolution()
}

solution1(startingMonkeys)



