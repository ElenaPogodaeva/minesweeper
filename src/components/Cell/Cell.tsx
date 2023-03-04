import { useAppDispatch } from 'hooks/hooks';
import React, { useState } from 'react';
import { setGameState } from 'redux/reducers/gameSlice';
import { ICell } from 'types/types';
import style from './Cell.module.scss';

type CellProps = {
  value: ICell;
  onLClick: () => void;
  onRClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Cell = ({ value, onLClick, onRClick }: CellProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const dispatch = useAppDispatch();

  function handleMouseDown(e: React.MouseEvent<HTMLElement>) {
    if (e.button === 0 && !value.isOpen && !value.flagIndex) {
      setIsMouseDown(true);
      dispatch(setGameState({ str: 'scared' }));
    }
  }
  function handleMouseUp(e: React.MouseEvent<HTMLElement>) {
    if (e.button === 0 && !value.isOpen && !value.flagIndex) {
      setIsMouseDown(false);
      dispatch(setGameState({ str: 'game' }));
    }
  }

  function getPosition(cell: ICell) {
    if (!cell.isOpen) {
      if (cell.flagIndex) {
        return cell.flagIndex === 1 ? '-34px -51px' : '-51px -51px';
      } else if (isMouseDown) {
        return '-17px -51px';
      }
      return '0px -51px';
    }
    if (cell.isMine) {
      return '-102px -51px';
    }
    if (cell.isEmpty) {
      return '-17px -51px';
    }
    return `${-17 * (cell.neighbour - 1)}px -68px`;
  }

  return (
    <div
      className={style.cell}
      onClick={onLClick}
      onContextMenu={onRClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        backgroundPosition: `${getPosition(value)}`,
      }}
    ></div>
  );
};

export default Cell;
