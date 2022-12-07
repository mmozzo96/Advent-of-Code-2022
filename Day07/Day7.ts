import * as fs from "fs";
import path from "path";

const Data: string[] = fs
  .readFileSync(path.join(__dirname, "Day7Data.txt"), "utf8")
  .split(/\r?\n/);
Data.splice(0, 1);

enum commands {
  LIST = "list",
  MOVE = "move",
  OBJECT = "object",
}

function readCommand(cmd: string): (commands | string)[] {
  let command: commands = commands.OBJECT;
  let moveTo: string = "";

  if (cmd === "$ ls") {
    command = commands.LIST;
  } else if (cmd.startsWith("$ cd")) {
    command = commands.MOVE;
    moveTo = cmd.slice(5, cmd.length);
  }

  return [command, moveTo];
}

function getCurrentDirectory(rootDir: any, path: string[]) {
  let currentDirectory = rootDir;

  path.length > 0 &&
    path.forEach((dir) => {
      currentDirectory = currentDirectory[dir];
    });
  
  return currentDirectory;
}

function directoriesStructure(Data: string[]){
  let root: any = {};

  function createDataStructure(Data: string[]) {
    let path: string[] = [];
    let currentDirectory = getCurrentDirectory(root, path);

    for (let i = 0; i < Data.length; i++) {
      const cmd: string = Data[i];
      const [command, moveTo]: (commands | string)[] = readCommand(cmd);

      if (command === commands.LIST) {
      } else if (command === commands.MOVE) {
        if (moveTo === ".." && path.length > 0) path.pop();
        else path.push(moveTo);
        currentDirectory = getCurrentDirectory(root, path);
      } else if (command === commands.OBJECT) {
        if (cmd.startsWith("dir")) {
          const objectName = cmd.slice(4, cmd.length);
          currentDirectory[objectName] = {};
        } else {
          const [objectSize, objectName]: string[] = cmd.split(" ");
          currentDirectory[objectName] = +objectSize;
        }
      }
    }

    return root;
  }

  return createDataStructure(Data);
}

const dirStructure = directoriesStructure(Data)

function getDirSize(dir: any) {
  let dirSize: number[] = [];

  function getSingleDirSize(dir: any): number {
    let singleDirSize: number = 0;

    for (const value of Object.values(dir)) {
      if (typeof value === "number") {
        singleDirSize += value;
      } else if (typeof value === "object") {
        singleDirSize += getSingleDirSize(value);
      } else throw new Error("a problem came up while sizing dirs");
    }

    dirSize.push(singleDirSize)

    return singleDirSize;
  }

  getSingleDirSize(dir);

  return dirSize;
}

const dirSize = getDirSize(dirStructure);

const solution1 = dirSize.reduce((soFar, next) => {
  const sF = <number>soFar;
  const n = <number>next;

  if (n < 100000) return sF + n;
  return sF;
}, 0)

console.log(solution1);
