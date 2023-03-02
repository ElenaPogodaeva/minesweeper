import Cell from 'Cell/Cell';
import React, { useState } from 'react';
import { ICell } from 'types/types';
import { initBoardData } from 'utils/utils';
import style from './Board.module.scss';
import { WIDTH, HEIGHT, MINES_COUNT } from 'utils/constants';

type BoardProps = {
  gameStatus: string;
  setGameStatus: (value: string) => void;
};

export const Board = ({ gameStatus, setGameStatus }: BoardProps) => {
  const [width, setWidth] = useState(WIDTH);
  const [height, setHeight] = useState(HEIGHT);
  const [mines, setMines] = useState(MINES_COUNT);
  const [grid, setGrid] = useState<ICell[][]>(() => initBoardData(height, width, mines));

  function handleLeftClick(x: number, y: number) {
    console.log(x, y);
  }

  return (
    <div className={style.board}>
      {grid.map((row) =>
        row.map((gridCell) => (
          <Cell
            key={gridCell.x * row.length + gridCell.y}
            value={gridCell}
            onClick={() => handleLeftClick(gridCell.x, gridCell.y)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
