import React from 'react';
import { ICell } from 'types/types';
import style from './Cell.module.scss';

type CellProps = {
  value: ICell;
  onClick: () => void;
};

export const Cell = ({ value, onClick }: CellProps) => {
  function getPosition(cell: ICell) {
    if (!cell.isOpen) {
      return cell.isFlagged ? '50px -51px' : '0px -51px';
    }
    if (cell.isMine) {
      return '-102px -51px';
    }
    if (cell.isEmpty) {
      return '-17px -51px';
    }
    return `${-17 * cell.neighbour}px -68px`;
  }

  return (
    <div
      className={style.cell}
      onClick={onClick}
      style={{
        backgroundPosition: `${getPosition(value)}`,
      }}
    ></div>
  );
};

export default Cell;
