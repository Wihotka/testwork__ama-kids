import { GameFieldState } from "../features/gameField/gameFieldSlice";

export const converNumToLetters = (num: number) => {
  let letter: string;

  switch (num) {
    case 1:
      letter = 'A';
      break;
    case 2:
      letter = 'B';
      break;
    case 3:
      letter = 'C';
      break;
    case 4:
      letter = 'D';
      break;
    case 5:
      letter = 'E';
      break;
    case 6:
      letter = 'F';
      break;
    case 7:
      letter = 'G';
      break;
    default:
      letter = '';
      break;
  }

  return letter;
}

export const filterDirs = (data: GameFieldState, arr: string[]) => {
  let filtredXDirs: string[] = [];
  let filtredDirs: string[] = [];

  switch (data.finishPoint.x) {
    case data.minPosition:
      filtredXDirs = arr.filter(dir => dir !== 'left');
      break;
    case data.maxPosition:
      filtredXDirs = arr.filter(dir => dir !== 'right');
      break;
    default:
      filtredXDirs = [...arr];
  }
  switch (data.finishPoint.y) {
    case data.minPosition:
      filtredDirs = filtredXDirs.filter(dir => dir !== 'up');
      break;
    case data.maxPosition:
      filtredDirs = filtredXDirs.filter(dir => dir !== 'down');
      break;
    default:
      filtredDirs = [...filtredXDirs];
  }

  return filtredDirs;
}
