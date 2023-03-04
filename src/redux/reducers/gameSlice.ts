import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICell } from 'types/types';
import { HEIGHT, MINES_COUNT, WIDTH } from 'utils/constants';
import { createBoard, getHidden, initBoardData, showBoard, showEmptyCells } from 'utils/utils';

export type GameState = {
  grid: ICell[][];
  width: number;
  height: number;
  mines: number;
  gameState: string;
  isClicked: boolean;
  time: number;
  isTimeActive: boolean;
};

const initialState: GameState = {
  grid: createBoard(HEIGHT, WIDTH),
  width: WIDTH,
  height: HEIGHT,
  mines: MINES_COUNT,
  gameState: 'game',
  isClicked: false,
  time: 0,
  isTimeActive: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    leftClick: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
      }>
    ) => {
      const { x, y } = action.payload;
      const { height, width, mines, gameState } = state;

      const currentCell = state.grid[x][y];

      if (currentCell.isOpen || currentCell.flagIndex || gameState !== 'game') {
        return;
      }

      state.isTimeActive = true;

      if (!state.isClicked) {
        state.grid = initBoardData(state.grid, height, width, mines, x, y);
        state.isClicked = true;
      }

      if (currentCell.isMine) {
        showBoard(state.grid);
        state.gameState = 'lose';
        state.isTimeActive = false;
        return;
      }

      currentCell.isOpen = true;

      if (currentCell.isEmpty) {
        showEmptyCells(height, width, x, y, state.grid);
      }

      if (getHidden(state.grid).length === mines) {
        showBoard(state.grid);
        state.gameState = 'win';
        state.mines = 0;
        state.isTimeActive = false;
        return;
      }
    },
    rightClick: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
      }>
    ) => {
      const { x, y } = action.payload;
      const currentCell = state.grid[x][y];

      if (currentCell.isOpen || state.gameState !== 'game') {
        return;
      }

      currentCell.flagIndex = currentCell.flagIndex > 1 ? 0 : currentCell.flagIndex + 1;

      if (currentCell.flagIndex === 1) {
        state.mines -= 1;
      } else if (currentCell.flagIndex === 2) {
        state.mines += 1;
      }
    },
    updateTime: (state) => {
      state.time += 1;
    },
    resetGame: (state) => {
      state.gameState = 'game';
      state.grid = createBoard(HEIGHT, WIDTH);
      state.mines = MINES_COUNT;
      state.isClicked = false;
      state.time = 0;
      state.isTimeActive = false;
    },
  },
});

export const { leftClick, rightClick, resetGame, updateTime } = gameSlice.actions;

export default gameSlice.reducer;
