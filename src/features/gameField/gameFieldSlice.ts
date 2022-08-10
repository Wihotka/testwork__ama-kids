import { createSlice } from '@reduxjs/toolkit';

interface PointState {
  x: number;
  y: number;
}

export interface GameFieldState {
  gameField: number[][];
  startPoint: PointState;
  finishPoint: PointState;
  minPosition: number;
  maxPosition: number;
  numberOfMoves: number;
  counter: number;
  direction: string;
  isStarted: boolean;
  speed: number;
}

const MIN_MOVES = 5;
const MAX_MOVES = 20;
const MIN_FIELD = 2;
const MAX_FIELD = 6;
const MIN_SPEED = 1;
const MAX_SPEED = 2;

const setInitialState = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

const createGameField = (min: number, max: number): number[][] => {
  const fieldArr = [];

  for (let i = min; i <= max; i++) {
    const rowArr = [];

    for (let i = min; i <= max; i++) {
      rowArr.push(i);
    }

    fieldArr.push(rowArr);
  }

  return fieldArr;
}

const initialState: GameFieldState = {
  gameField: [],
  startPoint: {
    x: 0,
    y: 0,
  },
  finishPoint: {
    x: 0,
    y: 0,
  },
  minPosition: 0,
  maxPosition: 2,
  numberOfMoves: 10,
  counter: 0,
  direction: '',
  isStarted: false,
  speed: 1.5,
}
initialState.gameField = createGameField(initialState.minPosition, initialState.maxPosition);
initialState.startPoint.x = setInitialState(initialState.minPosition, initialState.maxPosition);
initialState.startPoint.y = setInitialState(initialState.minPosition, initialState.maxPosition);
initialState.finishPoint.x = initialState.startPoint.x;
initialState.finishPoint.y = initialState.startPoint.y;

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    increaseMoves: (state) => {
      if (state.numberOfMoves < MAX_MOVES) {
        state.numberOfMoves += 1;
      }
    },
    decreaseMoves: (state) => {
      if (state.numberOfMoves > MIN_MOVES) {
        state.numberOfMoves -= 1;
      }
    },
    increaseField: (state) => {
      if (state.maxPosition < MAX_FIELD) {
        state.maxPosition += 1;
        state.gameField = createGameField(state.minPosition, state.maxPosition);
        state.startPoint.x = setInitialState(state.minPosition, state.maxPosition);
        state.startPoint.y = setInitialState(state.minPosition, state.maxPosition);
        state.finishPoint.x = state.startPoint.x;
        state.finishPoint.y = state.startPoint.y;
      }
    },
    decreaseField: (state) => {
      if (state.maxPosition > MIN_FIELD) {
        state.maxPosition -= 1;
        state.gameField = createGameField(state.minPosition, state.maxPosition);
        state.startPoint.x = setInitialState(state.minPosition, state.maxPosition);
        state.startPoint.y = setInitialState(state.minPosition, state.maxPosition);
        state.finishPoint.x = state.startPoint.x;
        state.finishPoint.y = state.startPoint.y;
      }
    },
    increaseSpeed: (state) => {
      if (state.speed < MAX_SPEED) {
        state.speed += 0.5;
      }
    },
    decreaseSpeed: (state) => {
      if (state.speed > MIN_SPEED) {
        state.speed -= 0.5;
      }
    },
    up: (state) => {
      state.finishPoint.y -= 1;
      state.direction = 'up';
    },
    right: (state) => {
      state.finishPoint.x += 1;
      state.direction = 'right';
    },
    down: (state) => {
      state.finishPoint.y += 1;
      state.direction = 'down';
    },
    left: (state) => {
      state.finishPoint.x -= 1;
      state.direction = 'left';
    },
    addCount: (state) => {
      state.counter += 1;
    },
    startGame: (state) => {
      state.isStarted = true;
    },
    stopGame: (state) => {
      state.isStarted = false;
    },
    restartGame: (state) => {
      state.direction = '';
      state.counter = 0;
      state.startPoint.x = setInitialState(state.minPosition, state.maxPosition);
      state.startPoint.y = setInitialState(state.minPosition, state.maxPosition);
      state.finishPoint.x = state.startPoint.x;
      state.finishPoint.y = state.startPoint.y;
    },
  },
});

export const {
  increaseMoves,
  decreaseMoves,
  increaseField,
  decreaseField,
  increaseSpeed,
  decreaseSpeed,
  up,
  right,
  down,
  left,
  addCount,
  startGame,
  stopGame,
  restartGame
} = gameFieldSlice.actions;

export default gameFieldSlice.reducer;
