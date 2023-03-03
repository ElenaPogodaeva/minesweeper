import React from 'react';
import { ICell } from 'types/types';
import style from './Cell.module.scss';

type CellProps = {
  value: ICell;
  onLClick: () => void;
  onRClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Cell = ({ value, onLClick, onRClick }: CellProps) => {
  function getPosition(cell: ICell) {
    if (!cell.isOpen) {
      if (cell.flagIndex) {
        return cell.flagIndex === 1 ? '-34px -51px' : '-51px -51px';
      } else {
        return '0px -51px';
      }
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
      style={{
        backgroundPosition: `${getPosition(value)}`,
      }}
    ></div>
  );
};

export default Cell;
