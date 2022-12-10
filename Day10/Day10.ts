import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day10Data.txt"), "utf8")
  .split(/\r?\n/);
  
interface instruction {
  numberOfCycles: number,
  finalRegisterValue: number
}
const InterestingCycles: number[] = [20, 60, 100, 140, 180, 220]

function readInstruction(instr: string, register: number): instruction {
  let numberOfCycles: number = 0
  let finalRegisterValue: number = 0
  
  if(instr==='noop') {
    numberOfCycles = 1
    finalRegisterValue = register
  }
  else if(instr.startsWith('addx')) {
    numberOfCycles = 2
    finalRegisterValue = register + (+instr.slice(5))
  } else {throw new Error('Wrong instruction given')}
  
  return {numberOfCycles, finalRegisterValue}
}

interface solution1Type {
  solution: number,
  cycles: number[]
}

function solution1(data: string[], interestingCycles: number[]): solution1Type {

  let cycles: number[] = [1]

  data.forEach((instr:string) => {
    const register = cycles[cycles.length-1]
    const {numberOfCycles, finalRegisterValue} = readInstruction(instr, register)

    if(numberOfCycles===1) cycles.push(finalRegisterValue)
    if(numberOfCycles===2) {
      cycles.push(register)
      cycles.push(finalRegisterValue)
    }
  })

  let solution: number = 0

  interestingCycles.forEach((cycleNumber: number) => {
    solution += cycleNumber * cycles[cycleNumber-1]
  })

  return {solution, cycles}
}

const {solution: solutionPart1, cycles} = solution1(Data, InterestingCycles)

console.log(solutionPart1)

function drawPixels(register: number, pixel: number): ('#'|' ') {
  if(Math.abs(register-pixel) < 2) return '#'
  return ' '
}

const lines = 6
const pixelsPerLine: number = 40

function solution2(cycles: number[]): string {
  let solution: string = ''

  for(let lineIdx=0;lineIdx<lines;lineIdx++) {
    let line: string = ''
    for(let pixel=0;pixel<pixelsPerLine;pixel++) {
      const cycle = (pixel + lineIdx*40)
      line += drawPixels(cycles[cycle], pixel)
    }
    solution += line+'\r\n' // \r is needed for windows OS otherwise \n alone should be used
  }

  return solution.replace(/(.{1})/g,"$1 ") // this is added for readibility
}

console.log(solution2(cycles))




